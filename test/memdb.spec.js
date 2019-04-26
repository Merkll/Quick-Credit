/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const MemDB = require('../src/lib/memdb');

describe('Memdb', () => {
  const dbName = 'test-db';
  const MemDBInstance = new MemDB(dbName);
  const collectionName = 'sample-Collection';
  context('MemDB Instantiation', () => {
    it('Should create an Instance of MemDB', () => {
      expect(MemDBInstance).to.be.an.instanceof(MemDB);
      expect(MemDBInstance.name).to.be.eql(dbName);
    });
  });
  context('MemDB Collection Creation', () => {
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

  context('Insert Data Into MemDB collection', () => {
    it('Should return object containing inserted Data', () => {
      const insertedCollection = MemDBInstance.insert(collectionName, { id: 555 });
      expect(insertedCollection).to.not.be.null;
    });

    it('Should throw an Error on null collectioName or data', () => {
      expect(MemDBInstance.insert).to.throw();
      expect(() => MemDBInstance.insert(collectionName)).to.throw();
    });

    it('Should throw an Error if collection isnt empty and data isnt an object', () => {
      expect(() => MemDBInstance.insert(collectionName, 555)).to.throw();
    });

    it('Should insert Data into collection if collection doesnt exist and data is not an object', () => {
      const inserted = MemDBInstance.insert('new-collection', 555);
      expect(inserted).to.not.be.null;
      expect(inserted).to.be.an.instanceof(Object);
    });

    it('Should insert Data into collection with id as key', () => {
      const id = 55;
      const inserted = MemDBInstance.insert('new-collection-2', { id, day: 'Sunday' });
      expect(inserted).to.not.be.null;
      expect(inserted).to.be.an.instanceof(Object);
    });

    it('Should insert Data into collection with internally generated Key if id not present', () => {
      const inserted = MemDBInstance.insert('new-collection-2', { day: 'Sunday' });
      expect(inserted).to.not.be.null;
      expect(inserted).to.be.an.instanceof(Object);
    });

    it('Should create collection if it doesnt exists', () => {
      const nonExistingCOllection = 'non-existing';
      const collectionExist = MemDBInstance.collectionExist(nonExistingCOllection);
      MemDBInstance.insert(nonExistingCOllection, { id: 88 });
      const collectionExistAfterInsertion = MemDBInstance.collectionExist(nonExistingCOllection);
      expect(collectionExist).to.be.false;
      expect(collectionExistAfterInsertion).to.be.true;
    });

    it('Should return object of MemDB', () => {
      const inserted = MemDBInstance.insert(collectionName, { id: 555 });
      expect(inserted).to.be.an.instanceof(Object);
      expect(inserted).to.be.an.instanceof(MemDB);
    });
    it('Should return object of MemDB with data property that contains inserted data', () => {
      const inserted = MemDBInstance.insert(collectionName, { id: 555 });
      expect(inserted).to.be.an.instanceof(Object);
      expect(inserted).to.be.an.instanceof(MemDB);
      expect(inserted.data).to.be.eql({ id: 555 });
    });
  });
});
