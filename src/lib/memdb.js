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

  // getter for the database name
  get name() {
    return this.dbName;
  }
  /**
   * Gets a collection
   * @param {string} collectionName
   * @returns {Object}
   */

  getCollection(collectionName) {
    if (!collectionName) throw new Error('Collection Name not Specified');
    return this.collections[collectionName];
  }

  /**
   * Creates a collection and initialises it to an empty Hash table
   * @param {*} collectionName
   * @returns {Object} collection created
   */
  createCollection(collectionName) {
    if (!collectionName) throw new Error('Collection Name not Specified');
    this.collections[collectionName] = {};
    return this.collections[collectionName];
  }

  /**
   * Checks if a collection Exist
   * @param {String} collectionName
   * @returns {Boolean}
   */

  collectionExist(collectioName) {
    return !!this.collections[collectioName];
  }

  /**
   * Inserts bulk data into a collection
   * @param {String} collection
   * @param {Array} data data to be inserted
   */
  bulkInsert(collection, data) {
    if (!collection || !data) throw new Error('Collection Name And Data Should be specified');
    if (!(data instanceof Array)) return this.insert(collection, data); // if data isnt an array
    return data.map(detail => this.insert(collection, detail));
  }

  /**
   * Insert a fied into a collection
   * @param {String} collection
   * @param {*} data
   */
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

  /**
   * Queries All Data in a collection
   * @param {String} collection
   */
  findAll(collection) {
    if (!collection) throw new Error('Collection Name Should be specified');
    return Object.values(this.collections[collection]); // convert data Object to array
  }

  /**
   * Queries data from a collection based on specified criteria
   * @param {String} collection
   * @param {Object} criteria
   */
  find(collection, criteria) {
    if (!collection || !criteria) throw new Error('Collection Name And Search Criteria Should be specified');
    if (!(criteria instanceof Object)) throw new Error('Search Criteria should be an object of fields');
    const collectionData = this.collections[collection];
    if (!collectionData) return [];
    return Object.entries(collectionData).map(([, value]) => {
      // check if search criteria is met
      if (Memdb.meetSearchCriteria(criteria, value)) return value;
      return null;
    }).filter(data => !!data);
  }

  /**
   * Determines if a single field meets a particular condition/criteria
   * @param {Object} criteria condition to be met
   * @param {Object} field  specifies data to check criteria against
   * @example
   *  meetSearchCriteria({id: 5, title: 'The Sunset'}, {id: 6, title: 'Midnight Call'})
   */
  static meetSearchCriteria(criteria, field) {
    let meetCriteria = true;
    if ('id' in criteria && criteria.id == field.id) return true;
    Object.entries(criteria).forEach(([key, value]) => {
      if (!(key in field) || field[key] != value) meetCriteria = false;
    });
    return meetCriteria;
  }

  /**
   * Updates Records in a collection that meet a criteria
   * @param {String} collection
   * @param {Object} criteria
   * @param {Object} value
   */
  update(collection, criteria, value = {}) {
    if (!collection || !criteria) throw new Error('Collection Name and criteria Should be specified');
    if (!(criteria instanceof Object)) throw new Error('Search Criteria should be an object of fields');
    const collectionData = this.collections[collection];
    if (!collectionData) return [];
    return Object.entries(collectionData).map(([key, details]) => {
      if (Memdb.meetSearchCriteria(criteria, details)) {
        collectionData[key] = { ...details, ...value };
        return collectionData[key];
      }
      return null;
    }).filter(details => !!details);
  }

  static getKeyOfDatathatMeetCriteria(data, criteria) {
    let collectionData = data;
    if (data instanceof Object && !(data instanceof Array)) collectionData = Object.values(data);
    return collectionData.map((details) => {
      if (Memdb.meetSearchCriteria(criteria, details)) return details.id;
      return null;
    }).filter(details => !!details);
  }

  delete(collection, criteria) {
    if (!collection || !criteria) throw new Error('Collection Name and criteria Should be specified');
    if (!(criteria instanceof Object)) throw new Error('Search Criteria should be an object of fields');
    const collectionData = this.collections[collection];
    if (!collectionData) return [];
    return Object.entries(collectionData).map(([key, details]) => {
      if (Memdb.meetSearchCriteria(criteria, details)) {
        collectionData[key] = null;
        return details;
      }
      return null;
    }).filter(details => !!details);
  }
};
