/**
 * MemDB is an In memory Database class
 * DataBase insertion Requires a primary key if multiple data are to be inserted into a collection
 */
module.exports = class Memdb {
  constructor(dbName) {
    this.dbName = dbName;
    this.collections = {}; // tables present in the database
    this.indexes = {};
  }

  get name() {
    return this.dbName;
  }

  getCollection(collectionName) {
    if (!collectionName) throw new Error('Collection Name not Specified');
    return this.collections[collectionName];
  }

  createCollection(collectionName) {
    if (!collectionName) throw new Error('Collection Name not Specified');
    this.collections[collectionName] = {};
    return this.collections[collectionName];
  }

  collectionExist(collectioName) {
    return !!this.collections[collectioName];
  }

  bulkInsert(collection, data) {
    if (!collection || !data) throw new Error('Collection Name And Data Should be specified');
    if (!(data instanceof Array)) return this.insert(collection, data);
    return data.map(detail => this.insert(collection, detail));
  }

  insert(collection, data) {
    if (!collection || !data) throw new Error('Collection Name Should be specified');
    if (this.collectionExist(collection) && !(data instanceof Object)) throw new Error('Insertion into a Non empty collection requires a data Object');
    if (!this.collectionExist(collection)) this.createCollection(collection);
    if (data instanceof Array) return this.bulkInsert(collection, data);
    if (!(data instanceof Object)) this.collections[collection] = data;
    else {
      const { id = 55 } = data;
      this.collections[collection][id] = data;
    }
    return data;
  }

  findAll(collection) {
    if (!collection) throw new Error('Collection Name Should be specified');
    return Object.values(this.collections[collection]);
  }

  find(collection, criteria) {
    if (!collection || !criteria) throw new Error('Collection Name And Search Criteria Should be specified');
    if (!(criteria instanceof Object)) throw new Error('Search Criteria should be an object of fields');
    const collectionData = this.collections[collection];
    if (!collectionData) return [];
    return Object.entries(collectionData).map(([, value]) => {
      if (Memdb.meetSearchCriteria(criteria, value)) return value;
      return null;
    }).filter(data => !!data);
  }

  static meetSearchCriteria(criteria, field) {
    let meetCriteria = true;
    if ('id' in criteria && criteria.id == field.id) return true;
    Object.entries(criteria).forEach(([key, value]) => {
      if (!(key in field) || field[key] != value) meetCriteria = false;
    });
    return meetCriteria;
  }
};
