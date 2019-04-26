/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const MemDB = require('../src/lib/memdb');

describe('Memdb', () => {
  const dbName = 'test-db';
  const MemDBInstance = new MemDB(dbName);
  context('MemDB Instantiation', () => {
    it('Should create an Instance of MemDB', () => {
      expect(MemDBInstance).to.be.an.instanceof(MemDB);
      expect(MemDBInstance.name).to.be.eql(dbName);
    });
  });
  context('MemDB Collection Creation', () => {
    const collectionName = 'sample-Collection';
    const collection = MemDBInstance.createCollection(collectionName);
    it('Should exist', () => {
      const collectionExist = MemDBInstance.collectionExist(collectionName);
      expect(collectionExist).to.be.true;
    });
    it('Should be an Instance of Object', () => {
      expect(collection).to.an.instanceof(Object);
    });
    it('Should throw an error when collection name is empty', () => {
      expect(MemDBInstance.createCollection).to.throw();
    });
  });

  context('MemDB get Collection', () => {
    const collectionName = 'sample-Collection';
    const collection = MemDBInstance.createCollection(collectionName);
    it('Should get a collection', () => {
      const obtainedCollection = MemDBInstance.getCollection(collectionName);
      expect(obtainedCollection).to.not.be.null;
      expect(obtainedCollection).to.be.eql(collection);
    });
    it('Should throw an error on empty argument to getCollection', () => {
      expect(MemDBInstance.getCollection).to.throw();
    });
  });
});
