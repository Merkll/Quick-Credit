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
      const data = 555;
      const inserted = MemDBInstance.insert('new-collection', data);
      expect(inserted).to.not.be.null;
      expect(data).to.be.eql(data);
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

    it('Should return object of inserted data', () => {
      const inserted = MemDBInstance.insert(collectionName, { id: 555 });
      expect(inserted).to.be.an.instanceof(Object);
      expect(inserted).to.be.eql({ id: 555 });
    });

    it('Should insert Array of Data', () => {
      const inserted = MemDBInstance.insert(collectionName, [{ id: 555 }, { id: 98 }]);
      expect(inserted).to.be.eql([{ id: 555 }, { id: 98 }]);
    });
  });

  context('Insert bulk Data(Array) of Data) Into MemDB collection #bulkInsert', () => {
    it('Should throw an error on empty collection', () => {
      expect(MemDBInstance.bulkInsert).to.throw();
      expect(() => MemDBInstance.bulkInsert('bulk-collection')).to.throw();
    });

    it('Should throw an error on empty data', () => {
      expect(() => MemDBInstance.bulkInsert('bulk-collection')).to.throw();
    });
    it('Should insert Data if data isnt an Array ', () => {
      const inserted = MemDBInstance.bulkInsert('bulk-collection-non-array', 99);
      expect(inserted).to.be.eql(99);
    });
    it('Should return array of inserted Data ', () => {
      const inserted = MemDBInstance.bulkInsert('bulk-collection-array', [{ id: 55 }, { id: 77 }]);
      expect(inserted).to.be.eql([{ id: 55 }, { id: 77 }]);
    });
  });
  context('Quering All Data from MemDB collection', () => {
    const collection = 'user-details';
    const userData = [
      {
        id: 1,
        firstName: 'Mike',
        lastName: 'John',
        occupation: 'Engineer',
      },
      {
        id: 2,
        firstName: 'Juliet',
        lastName: 'Anderson',
        occupation: 'Engineer',
      },
    ];

    beforeEach(() => {
      MemDBInstance.insert(collection, userData);
    });

    it('Should return an object', () => {
      const data = MemDBInstance.findAll(collection);
      expect(data).to.not.be.null;
      expect(data).to.be.an.instanceof(Object);
    });

    it('Should throw an error if collection is not given', () => {
      expect(MemDBInstance.findAll).to.throw();
    });

    it('Should return the data', () => {
      const data = MemDBInstance.findAll(collection);
      expect(data).to.be.eql(userData);
    });
  });
});
