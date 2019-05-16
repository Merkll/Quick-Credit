import { Pool } from 'pg';
import Debug from 'debug';
import dbConfig from './config';

const debug = Debug('dev');

const dbPool = new Pool(dbConfig);

const Protected = new WeakMap();

export default class {
  constructor(database) {
    this.db = dbPool;
    Protected.set(this, {
      database
    });// initialises protected data
  }

  async init() {
    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  excape(str) {
    return (`${str}`).replace(/["|']/g, '');
  }

  // eslint-disable-next-line class-methods-use-this
  stringifyField(field) {
    return (typeof field === 'string') ? `'${this.excape(field)}'` : field;
  }
  
  async createTable(tableName, schema) {
    const query = `
      create table IF NOT EXISTS ${tableName} (
        ${schema.join(', ')}
      );
    `;
    return this.execute(query);
  }

  get database() {
    return Protected.get(this).database;
  }

  get queryObject() {
    return this.queryActions;
  }

  setProtectedData({ props, value }) {
    Protected.get(this)[props] = value;
    return Protected.get(this)[props];
  }

  select(values = '*') {
    this.queryActions = { 
      action: 'select', values, where: '', join: {} 
    };
    return this;
  }

  insert(values = {}) {
    this.queryActions = { action: 'insert', values };
    return this;
  }

  update(table) {
    this.queryActions = { action: 'update', table };
    return this;
  }
  
  set(field, value) {
    const data = {};
    data[field] = value;
    this.queryActions.values = { ...data };
    return this;
  }

  setFields(values) {
    this.queryActions.values = { ...this.queryActions.values, ...values };
    return this;
  }

  from(table) {
    this.queryActions.table = table;
    return this;
  }

  into(table) {
    this.queryActions.table = table;
    return this;
  }

  delete(table) {
    this.queryActions = { action: 'delete', table };
    return this;
  }

  where(condition) {
    this.queryActions.where = condition;
    return this;
  }

  join(table) {
    this.queryActions.join[table] = {};
    this.currentTable = table;
    return this;
  }

  on(left, right) {
    this.queryActions.join[this.currentTable][left] = right;
    return this;
  }

  limit(limit) {
    this.queryActions.limit = `LIMIT ${limit}`;
    return this;
  }

  offset(offset) {
    this.queryActions.offset = `OFFSET ${offset}`;
    return this;
  }

  buildClause(queryCondition) {
    const condition = queryCondition || this.queryObject.where;
    if (!(condition instanceof Object)) return '';
    const conjuctors = ['and', 'or'];
    const operators = {
      eq: '=',
      ne: '!=',
      leq: '<='
    };
    // eslint-disable-next-line arrow-body-style
    const clauseIterator = (clause) => {
      return Object.entries(clause).map(([key, value]) => {
        if (conjuctors.includes(key)) {
          return `${key} ${clauseIterator(value)}`;
        }
        const [op, field] = Object.entries(value)[0];
        const fieldValue = (typeof field === 'string') ? `'${field}'` : field;
        return `${key} ${operators[op]} ${fieldValue}`;
      }).join(' ');
    };
    return `WHERE ${clauseIterator(condition)}`;    
  }
  
  buildJoin() {
    const { join, table: baseTable } = this.queryActions;
    const query = Object.entries(join).map(([table, ref]) => {
      const [left, right] = Object.entries(ref)[0];
      return `JOIN ${table} ON ${table}.${left} = ${baseTable}.${right}`;
    }).join(' ');
    return query;
  }

  selectQueryBuild() {
    const {
      values, where, table, join, offset = '', limit = '', 
    } = this.queryObject;
    let joinQuery = '';
    if (join) joinQuery = this.buildJoin();
    const clause = this.buildClause(where);
    const query = `SELECT ${values} FROM ${table} ${joinQuery} ${clause}${offset} ${limit} `;
    this.queryData = query;
    return this;
  }

  objectToFields(dataObject, formatter = (datfield, row) => ((typeof row === 'string') ? `'${this.excape(row)}'` : row)) {
    let values = dataObject;
    this.n = 5;
    if (!Array.isArray(values)) values = [values];

    const dataFields = Object.keys(values[0]);
    
    const fields = values.map((row) => {
      const fieldString = dataFields.map(dataField => ((typeof formatter === 'function') ? formatter(dataField, row[dataField]) : row[dataField])).join(', ');
      return `(${fieldString})`;
    }).join(', ');
    return { cols: dataFields, fields };
  }

  insertQueryBuild() {
    const { table } = this.queryObject;
    const { values } = this.queryObject;
    const { cols, fields } = this.objectToFields(values);
    const query = `INSERT INTO ${table} (${cols.join(', ')}) VALUES ${fields} RETURNING *`;
    this.queryData = query;
    return this;
  }

  updateQueryBuild() {
    const { table, values, where } = this.queryObject;
    const clause = this.buildClause(where);
    const { fields } = this.objectToFields(values, (col, row) => `${col} = ${this.stringifyField(row)}`);
    const query = `UPDATE ${table} SET ${fields.substr(1).slice(0, -1)} ${clause}  RETURNING *`;
    this.queryData = query;
    return this;
  }

  deleteQueryBuild() {
    const { where, table } = this.queryObject;
    const clause = this.buildClause(where);
    const query = `DELETE FROM ${table} ${clause} RETURNING *`;
    this.queryData = query;
    return this;
  }

  queryString() {
    const queryActionHandlers = { 
      select: this.selectQueryBuild.bind(this),
      insert: this.insertQueryBuild.bind(this),
      update: this.updateQueryBuild.bind(this),
      delete: this.deleteQueryBuild.bind(this),
    };
    const { action } = this.queryObject;
    return queryActionHandlers[action]();
  }

  async execute(query) {
    const sql = query || this.queryString().queryData;
    debug(sql);
    const { rows } = await this.db.query(sql);
    return rows;
  }
}
