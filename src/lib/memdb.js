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

  insert(collection, data) {
    if (!collection || !data) throw new Error('Collection Name Should be specified');
    if (this.collectionExist(collection) && !(data instanceof Object)) throw new Error('Insertion into a Non empty collection requires a data Object');
    if (!this.collectionExist(collection)) this.createCollection(collection);
    if (!(data instanceof Object)) this.collections[collection] = data;
    else {
      const { id = 55 } = data;
      this.collections[collection][id] = data;
    }
    this.data = data;
    return this;
  }
};
