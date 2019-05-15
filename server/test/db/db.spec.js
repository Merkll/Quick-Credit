/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import DB from '../../src/db/db';

const testDatabase = 'testdb';
const testTable = 'testtable';
const joinTable = 'jointable';

before(async () => {
  const query = `
    create table IF NOT EXISTS ${testTable} (
      id SERIAL PRIMARY KEY ,
      name TEXT,
      age INTEGER
    );    
  `;
  const query2 = `
  create table IF NOT EXISTS ${joinTable} (
    id SERIAL PRIMARY KEY,
    detail INTEGER
  );    
`;
  const db = new DB(testDatabase);
  await db.execute(query);
  await db.execute(query2);
});

after(async () => {
  const query = `
    DROP TABLE IF EXISTS ${testTable};  
    DROP TABLE IF EXISTS ${joinTable};  
  `;
  const db = new DB(testDatabase);
  await db.execute(query);
});
describe('DB', () => {
  describe('Db instantiation', () => {
    it('Should instantiate an object of type DB', () => {
      const db = new DB(testDatabase);
      expect(db).to.be.instanceof(DB);
    });
    it('Should have a database property', () => {
      const db = new DB(testDatabase);
      expect(db.database).to.be.eqls(testDatabase);
    });
    it('Should initialise database', async () => {
      const db = await (new DB(testDatabase));
      expect(db).to.be.instanceof(DB);
    });
  });
  describe('data encapsulation', () => {
    const db = new DB(testDatabase);
    it('Should return protected data on save', () => {
      const savedData = db.setProtectedData({ props: 'config', value: 'config' });
      expect(savedData).to.eqls('config');
    });
    it('Protected data should not be accessible', () => {
      db.setProtectedData({ props: 'config', value: 'config' });
      expect(db.config).to.be.undefined;
    });
  });
  describe('db Select', async () => {
    const db = await new DB(testDatabase);
    it('Should save the action and return db instance ', () => {
      const select = db.select();
      expect(select).to.be.instanceof(DB);
      expect(select.queryObject.action).to.be.eqls('select');
    });
    it('Should use specified columns ', () => {
      const select = db.select('name, age');
      expect(select).to.be.instanceof(DB);
      expect(select.queryObject.values).to.be.eqls('name, age');
    });
    it('Should add the table to query from', () => {
      const table = db.from('testTable');
      expect(table.queryObject.table).to.be.eqls('testTable');
    });
    it('Should add select clause', () => {
      const where = db.where({ id: { eq: 1 } });
      expect(where.queryObject.where).to.be.eqls({ id: { eq: 1 } });
    });
    it('Should return the query string', () => {
      const query = db.queryString();
      expect(query.queryData).to.match(/SELECT .* FROM .* WHERE/);
    });
    it('Should build string of where lause', () => {
      const query = db.buildClause({ 
        id: { eq: 32 }, or: { id: { eq: 5 } }, and: { age: { ne: 55 } } 
      });
      expect(query).to.not.be.undefined;
      expect(query).to.be.eql('WHERE id = 32 or id = 5 and age != 55');
    });
    it('Should use object where clause if clause isnt specified', () => {
      const query = db.buildClause();
      expect(query).to.not.be.undefined;
      expect(query).to.be.eql('WHERE id = 1');
    });
    it('Should return empty string if condition isnt an object', () => {
      const query = db.buildClause('condition');
      expect(query).to.not.be.undefined;
      expect(query).to.be.eql('');
    });
  });
  describe('db Insert', async () => {
    const db = await new DB(testDatabase);
    it('Should save the action and return db instance ', () => {
      const insert = db.insert();
      expect(insert).to.be.instanceof(DB);
      expect(insert.queryObject.action).to.be.eqls('insert');
      expect(insert.queryObject.values).to.be.empty;
    });
    it('Should use specified values ', () => {
      const insert = db.insert({ name: 'name', age: 34 });
      expect(insert).to.be.instanceof(DB);
      expect(insert.queryObject.values).to.be.eqls({ name: 'name', age: 34 });
    });
    it('Should add the table to query from', () => {
      const table = db.into('testTable');
      expect(table.queryObject.table).to.be.eqls('testTable');
    });
    it('Should add insert clause', () => {
      const where = db.where({ id: { eq: 1 } });
      expect(where.queryObject.where).to.be.eqls({ id: { eq: 1 } });
    });
    it('Should return the query string', () => {
      const query = db.queryString();
      expect(query.queryData).to.match(/INSERT INTO .* /);
    });
    it('Should handle bulk insert ', () => {
      const insert = db.insert([{ name: 'name', age: 34 }, { name: 'name', age: 34 }, { name: 'name', age: 34 }]).into('testTable');
      const query = db.queryString();
      expect(query.queryData).to.not.be.undefined;
      expect(insert).to.be.instanceof(DB);
    });
  });
  describe('db Update', async () => {
    const db = await new DB(testDatabase);
    it('Should update the action and return db instance ', () => {
      const update = db.update('testTable');
      expect(update).to.be.instanceof(DB);
      expect(update.queryObject.action).to.be.eqls('update');
    });
    it('Should set field values ', () => {
      const update = db.set('age', 40);
      expect(update.queryActions.values).to.contain({ age: 40 });
    });
    it('Should set multiple field values ', () => {
      const update = db.setFields({ name: 'John' });
      expect(update.queryActions.values).to.contain({ name: 'John' });
    });
    it('Should set multiple field values ', () => {
      const update = db.setFields({ name: 'John' });
      expect(update.queryActions.values).to.contain({ name: 'John' });
    });
    it('Should return the query string', () => {
      const query = db.queryString();
      expect(query.queryData).to.match(/UPDATE .* SET .* /);
    });
  });
  describe('db delete', async () => {
    const db = await new DB(testDatabase);
    it('Should update the action and return db instance ', () => {
      const update = db.delete('testTable');
      expect(update).to.be.instanceof(DB);
      expect(update.queryObject.action).to.be.eqls('delete');
    });
    it('Should set clause ', () => {
      const update = db.where({ id: { eq: 40 } });
      expect(update.queryActions.where).to.eql({ id: { eq: 40 } });
    });
    it('Should return delete query', () => {
      const query = db.queryString();
      expect(query.queryData).to.match(/DELETE .* /);
    });
  });
  describe('db Join', async () => {
    const db = await new DB(testDatabase);
    const select = db.select().from('testTable');
    it('Should join table ', () => {
      const update = select.join('table2');
      expect(update.queryActions.join.table2).to.not.be.undefined;
    });
    it('Should specify join clause', () => {
      const query = select.on('id', 'user');
      expect(query.queryActions.join.table2).to.contain({ id: 'user' });
    });

    it('Should return the queryString', () => {
      const query = select.queryString('id', 'user');
      expect(query.queryData).to.match(/JOIN .* ON .* /);
    });
  });
  describe('db Offset and Limit', async () => {
    const db = await new DB(testDatabase);
    const select = db.select().from('testTable');
    it('Should limit queried data ', () => {
      const limit = select.limit(10);
      expect(limit.queryActions.limit).to.be.eqls('LIMIT 10');
    });
    it('Should offset query', () => {
      const offset = select.offset(10);
      expect(offset.queryActions.offset).to.be.eqls('OFFSET 10');
    });
    it('Should return query string', () => {
      const query = select.queryString();
      expect(query.queryData).to.match(/OFFSET 10 LIMIT 10/);
    });
  });
  describe('Query Execute', async () => {
    const db = await new DB(testDatabase);
    const dataToInsert = { name: 'John', age: 54 };
    before(async () => {
      await db.insert(dataToInsert).into(testTable);
    });
    const select = db.select().from('testTable').where({ id: { eq: 10 } });
    it('Should return queried data', async () => {
      const data = await select.execute();
      expect(data[0]).to.be.contain(dataToInsert);
    });
  });
  describe('DB JOIN', async () => {
    const db = await new DB(testDatabase);
    const dataToInsert = { name: 'John', age: 54 };
    
    before(async () => {
      const data = await db.insert(dataToInsert).into(testTable).execute();
      const { id } = data[0];
      const joinData = { detail: id };
      await db.insert(joinData).into(joinTable).execute();
    });
    it('Should return join data', async () => {
      const joinData = await db.select().from(testTable).join(joinTable).on('detail', 'id')
        .execute();
      expect(joinData).to.not.be.undefined;
    });
  });
  describe('JSON to sql fields', async () => {
    const db = await new DB(testDatabase);
    const dataToInsert = { name: 'John', age: 54 };
    it('Should return fields using default formatter', async () => {
      const { cols, fields } = db.objectToFields(dataToInsert);
      expect(cols).to.be.eqls(['name', 'age']);
      expect(fields).to.not.be.undefined;
    });
    it('Should return fields using specified formatter', async () => {
      const { cols, fields } = db.objectToFields(dataToInsert, (field, row) => `${field} = ${row}`);
      expect(cols).to.be.eqls(['name', 'age']);
      expect(fields).to.not.be.undefined;
    });
    it('Should return fields if formatter isnt a function', async () => {
      const { cols, fields } = db.objectToFields(dataToInsert, 'formatter');
      expect(cols).to.be.eqls(['name', 'age']);
      expect(fields).to.not.be.undefined;
    });
  });
});
