/* eslint-disable import/no-named-as-default-member */
/**
 * Base class inherited by all models
 * @constructor
 * @param {string} modelName - Name to attach to the model.
 * @param {Object} hooks - An object of hooks functions
 * @example
 * new Model('modelName',{
 *  afterInsert: (data) => {}
 * })
 * Valid Hooks are beforeInsert, afterInsert, afterFind, beforeUpdate
 * afterUpdate, afterDelete
 */

import DB from '../db/db';
import Validator from '../lib/schema-validator';

const database = process.env.DB_DATABASE || 'quickCredit'; 

export default class Model {
  constructor(modelName, schema, hooks = {}, db) {
    this.modelName = modelName;
    this.associations = {};
    this.hooks = hooks;
    this.database = db || database;
    this.schema = schema;
    this.init(); // initialises the model
  }

  init() {
    this.triggerHook('start', this);
  }

  
  getDbFieldsFromModelSchema() {
    const schemaTypeToDB = {
      string: 'TEXT',
      integer: 'INTEGER',
      number: 'NUMERIC',
      boolean: 'BOOLEAN',
      required: 'NOT NULL',
      unique: 'UNIQUE',
      date: 'DATE',
    };
    const { schema } = this;
    return Object.entries(schema).map(([key, value]) => {
      if (key === 'id') return 'id SERIAL PRIMARY KEY';
      const type = schemaTypeToDB[value.type];
      const unique = (value.unique) ? schemaTypeToDB.unique : '';
      const required = (value.required) ? schemaTypeToDB.required : '';
      return `${key} ${type} ${required} ${unique}`;
    });
  }

  get DB() {
    return new DB(this.database);
  }

  async initialise() {
    const { table } = this;
    const schema = this.getDbFieldsFromModelSchema();
    await this.DB.createTable(table, schema);
    return this;
  }

  get Model() {
    return this;
  }

  get table() {
    return `${this.modelName.toLowerCase()}s`;
  }

  get data() {
    return (this.QueryData) ? this.QueryData : {};
  }

  /**
   * Sets association for a model
   * @param {string} association  -type of association (hasMany, hasOne, belongsTo)
   * @param {Object} model - Model to associate with
   */
  setAssociation(association, model, references = {}) {
    if (!association) throw new Error('Association isnt specified');
    if (!this.associations[association]) this.associations[association] = {};
    const { modelName } = model;
    this.associations[association][modelName] = { model, references };
    return this.associations[association];
  }

  /**
   * Tests for the validity of a model before associating it
   * @param {Object} associatedModel - Model Object to asssociate to
   */
  static validateAssociation(associatedModel) {
    if (!associatedModel) throw new Error('Associated Model Not specified');
    if (!(associatedModel instanceof Model)) throw new Error('Associated Model should be an instance of Model');
    return !!associatedModel.modelName;
  }

  /**
   * HAndles definition of a hasMany assocation
   * @param {Object} associatedModel -Model Object to asssociate to
   */
  hasMany(associatedModel, references) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('hasmany', associatedModel, references);
    return this;
  }

  /**
   * HAndles definition of a hasOne assocation
   * @param {Object} associatedModel -Model Object to asssociate to
   */
  hasOne(associatedModel, references) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('hasone', associatedModel, references);
    return this;
  }

  /**
   * HAndles definition of a belongsTo assocation
   * @param {Object} associatedModel -Model Object to asssociate to
   */
  belongsTo(associatedModel, references) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('belongsto', associatedModel, references);
    return this;
  }

  async findAll(associate = false) {
    const query = this.DB.select().from(this.table);
    if (associate) this.associate(query);
    this.QueryData = await query.execute();
    this.QueryData = this.triggerHook('afterFind', this.QueryData);
    return this;
  }

  async find(criteria = {}, associate = false, hookData) {
    const query = this.DB.select().from(this.table).where(criteria);
    if (associate) this.associate(query);
    this.QueryData = await query.execute();
    this.triggerHook('afterFind', this.QueryData, hookData);
    return this;
  }

  validateSchema(data, update = false) {
    let schemaValidation;
    if (update) schemaValidation = Validator.validateSchemaForUpdate(data, this.schema);
    else schemaValidation = Validator.schema(data, this);
    const { valid, errors } = schemaValidation;
    return { valid, errors };
  }

  async insert(data = []) {
    const transformedData = this.triggerHook('beforeInsert', data);
    this.QueryData = await this.DB.insert(transformedData).into(this.table).execute();
    this.QueryData = this.triggerHook('afterInsert', this.QueryData);
    return this;
  }

  async delete(criteria = {}) {
    this.QueryData = await this.DB.delete(this.table).where(criteria).execute();
    this.triggerHook('afterDelete', this.QueryData);
    return this;
  }

  async deleteAll() {
    this.QueryData = await this.DB.deleteAll(this.table).execute();
    return this;
  }

  async dropTable() {
    this.QueryData = await this.DB.execute(`DROP TABLE IF EXISTS ${this.table}; `);
    return this;
  }

  async update(value = {}, criteria = {}) {
    const transformedValue = this.triggerHook('beforeUpdate', value);
    this.QueryData = await this.DB.update(this.table)
      .setFields(transformedValue).where(criteria).execute();
    this.triggerHook('afterUpdate', this.QueryData);
    return this;
  }

  associate(query) {
    Object.entries(this.associations)
      .map(([, value]) => Object.values(value)
        .map(({ model, references }) => query.join(model.table)
          .on(Object.keys(references)[0], Object.values(references)[0])));
    return query;
  }

  /**
   * trigeers user supplied hooks once the stage to trigger such as been attained
   * @param {String} hook -Name of the hook to trigger
   * @param {Object} data - Data to pass to the hook
   */
  triggerHook(hook, data = {}, hookData) {
    if (!hook) throw new Error('Hook to execute not specified');
    const hookFunction = this.hooks[hook];
    if (!hookFunction && typeof hookFunction !== 'function') return data;
    return hookFunction(data, hookData);
  }
}
