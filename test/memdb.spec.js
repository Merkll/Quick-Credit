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

  context('meetSearchCriteria()', () => {
    it('Should throw an error if criteria isnt specified', () => {
      expect(() => MemDB.meetSearchCriteria()).to.throw();
    });
    it('Should return true with valid criteria and fiedl', () => {
      const response = MemDB.meetSearchCriteria({ id: 4 }, { id: 4, title: 'Unknown' });
      expect(response).to.be.true;
    });

    it('Should return false with invalid criteria and fiedl', () => {
      const response = MemDB.meetSearchCriteria({ id: 8 }, { id: 4, title: 'Unknown' });
      expect(response).to.be.false;
    });
  });
  context('Quering Data from MemDB collection based on criteria', () => {
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

    it('Should throw an error if collection is not given', () => {
      expect(MemDBInstance.find).to.throw();
    });

    it('Should throw an error if criteria is not specified', () => {
      expect(() => MemDBInstance.find(collection)).to.throw();
    });

    it('Should throw an error if criteria is not an object containing fields', () => {
      expect(() => MemDBInstance.find(collection, 65)).to.throw();
    });

    it('Should return empty array if collection doesnt exist', () => {
      const data = MemDBInstance.find('x-collection', { id: 1 });
      expect(data).to.be.empty;
    });

    it('Should return Array of Data with criteria specifing id', () => {
      const data = MemDBInstance.find(collection, { id: 1 });
      expect(data).to.be.an.instanceof(Array);
      expect(data[0]).to.be.eql(userData[0]);
    });
    it('Should return Array of Data without id in criteria', () => {
      const data = MemDBInstance.find(collection, { firstName: 'Mike' });
      expect(data).to.be.an.instanceof(Array);
      expect(data[0]).to.be.eql(userData[0]);
    });
    it('Should return Empty Array of Data if criteria isnt valid', () => {
      const data = MemDBInstance.find(collection, { firstName: 'Jane' });
      expect(data).to.be.an.instanceof(Array);
      expect(data).to.be.eql([]);
    });
  });

  context('Updating Data from MemDB collection', () => {
    const collection = 'user-details';
    it('Should throw an error if collection isnt specified', () => {
      expect(() => MemDBInstance.update()).to.throw();
    });
    it('Should throw an error if criteria isnt specified', () => {
      expect(() => MemDBInstance.update(collection)).to.throw();
    });
    it('Should throw an error if criteria isnt an object', () => {
      expect(() => MemDBInstance.update(collection, 9)).to.throw();
    });
    it('Should return empty array if collection doesnt exist', () => {
      const data = MemDBInstance.update('x-collection', { id: 5 });
      expect(data).to.be.an.instanceof(Array);
      expect(data).to.be.empty;
    });
    it('Should return an array of updated Data', () => {
      const data = MemDBInstance.update(collection, { id: 1 }, { firstName: 'Phillips' });
      expect(data).to.be.an.instanceof(Array);
      expect(data).to.not.be.empty;
      expect(data[0].firstName).to.be.eql('Phillips');
    });
  });

  context('getKeyOfDatathatMeetCriteria()', () => {
    const data = [
      {
        id: 1,
        title: 'Battle of Winterfell',
        genre: 'adventure',
      },
      {
        id: 3,
        title: 'The battle',
        genre: 'adventure',
      },
      {
        id: 4,
        title: 'The battle',
        genre: 'action',
      },
    ];

    const dataObject = {
      1: {
        id: 1,
        title: 'Battle of Winterfell',
        genre: 'adventure',
      },
      3: {
        id: 3,
        title: 'The battle',
        genre: 'adventure',
      },
      4: {
        id: 4,
        title: 'The battle',
        genre: 'action',
      },
    };

    it('Should return Array of keys that meet criteria', () => {
      const response = MemDB.getKeyOfDatathatMeetCriteria(data, { genre: 'adventure' });
      expect(response).to.be.eql([1, 3]);
    });

    it('Should return Array of keys that meet criteria if collectionData instanceof Object', () => {
      const response = MemDB.getKeyOfDatathatMeetCriteria(dataObject, { genre: 'adventure' });
      expect(response).to.be.eql([1, 3]);
    });
  });

  context('Deleting Data from MemDB collection', () => {
    const collection = 'user-details';
    it('Should throw an error if collection isnt specified', () => {
      expect(() => MemDBInstance.delete()).to.throw();
    });
    it('Should throw an error if criteria isnt specified', () => {
      expect(() => MemDBInstance.delete(collection)).to.throw();
    });
    it('Should throw an error if criteria isnt an object', () => {
      expect(() => MemDBInstance.delete(collection, 9)).to.throw();
    });
    it('Should return empty array if collection doesnt exist', () => {
      const data = MemDBInstance.delete('x-collection', { id: 5 });
      expect(data).to.be.an.instanceof(Array);
      expect(data).to.be.empty;
    });
    it('Should return an array of deleted Data', () => {
      const data = MemDBInstance.delete(collection, { id: 1 });
      expect(data).to.be.an.instanceof(Array);
      expect(data).to.not.be.empty;
      expect(data[0].id).to.be.eql(1);
    });
  });
});
