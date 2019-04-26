/**
 * MemDB is an In memory Database class
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
};
