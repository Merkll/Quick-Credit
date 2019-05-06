"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable eqeqeq */

/**
 * MemDB is an In memory Database class
 * DataBase insertion Requires a primary key if multiple data are to be inserted into a collection
 */
var Memdb =
/*#__PURE__*/
function () {
  function Memdb(dbName) {
    _classCallCheck(this, Memdb);

    this.dbName = dbName;
    this.collections = {}; // tables present in the database

    this.indexes = {};
    this.primaryKey = {}; // Handles giving primary key for aa record in a collection
  } // getter for the database name


  _createClass(Memdb, [{
    key: "getCollection",

    /**
     * Gets a collection
     * @param {string} collectionName
     * @returns {Object}
     */
    value: function getCollection(collectionName) {
      if (!collectionName) throw new Error('Collection Name not Specified');
      return this.collections[collectionName];
    }
  }, {
    key: "getPrimaryKey",
    value: function getPrimaryKey(collection) {
      if (!this.primaryKey[collection]) this.primaryKey[collection] = 1;else this.primaryKey[collection] += 1;
      return this.primaryKey[collection];
    }
    /**
     * Creates a collection and initialises it to an empty Hash table
     * @param {*} collectionName
     * @returns {Object} collection created
     */

  }, {
    key: "createCollection",
    value: function createCollection(collectionName) {
      if (!collectionName) throw new Error('Collection Name not Specified');
      this.collections[collectionName] = {};
      return this.collections[collectionName];
    }
    /**
     * Checks if a collection Exist
     * @param {String} collectionName
     * @returns {Boolean}
     */

  }, {
    key: "collectionExist",
    value: function collectionExist(collectioName) {
      return !!this.collections[collectioName];
    }
    /**
     * Inserts bulk data into a collection
     * @param {String} collection
     * @param {Array} data data to be inserted
     */

  }, {
    key: "bulkInsert",
    value: function bulkInsert(collection, data) {
      var _this = this;

      if (!collection || !data) throw new Error('Collection Name And Data Should be specified');
      if (!(data instanceof Array)) return this.insert(collection, data); // if data isnt an array

      return data.map(function (detail) {
        return _this.insert(collection, detail);
      });
    }
    /**
     * Insert a fied into a collection
     * @param {String} collection
     * @param {*} data
     */

  }, {
    key: "insert",
    value: function insert(collection, data) {
      if (!collection || !data) throw new Error('Collection Name Should be specified');
      if (this.collectionExist(collection) && !(data instanceof Object)) throw new Error('Insertion into a Non empty collection requires a data Object');
      if (!this.collectionExist(collection)) this.createCollection(collection);
      if (data instanceof Array) return this.bulkInsert(collection, data);
      var collectionData = this.getCollection(collection);
      var insertedData = data;
      if (!(data instanceof Object)) collectionData = data;else {
        var id = data.id;

        if (!id) {
          id = this.getPrimaryKey(collection);
        }

        collectionData[id] = _objectSpread({
          id: id
        }, data);
        insertedData = collectionData[id];
      }
      return insertedData;
    }
    /**
     * Queries All Data in a collection
     * @param {String} collection
     */

  }, {
    key: "findAll",
    value: function findAll(collection) {
      if (!collection) throw new Error('Collection Name Should be specified');
      return Object.values(this.getCollection(collection)); // convert data Object to array
    }
    /**
     * Queries data from a collection based on specified criteria
     * @param {String} collection
     * @param {Object} criteria
     */

  }, {
    key: "find",
    value: function find(collection, criteria) {
      if (!collection || !criteria) throw new Error('Collection Name And Search Criteria Should be specified');
      if (!(criteria instanceof Object)) throw new Error('Search Criteria should be an object of fields');
      var collectionData = this.getCollection(collection);
      if (!collectionData) return [];
      return Object.entries(collectionData).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[1];

        // check if search criteria is met
        if (Memdb.meetSearchCriteria(criteria, value)) return value;
        return null;
      }).filter(function (data) {
        return !!data;
      });
    }
    /**
     * Determines if a single field meets a particular condition/criteria
     * @param {Object} criteria condition to be met
     * @param {Object} field  specifies data to check criteria against
     * @example
     *  meetSearchCriteria({id: 5, title: 'The Sunset'}, {id: 6, title: 'Midnight Call'})
     */

  }, {
    key: "update",

    /**
     * Updates Records in a collection that meet a criteria
     * @param {String} collection
     * @param {Object} criteria
     * @param {Object} value
     */
    value: function update(collection, criteria) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!collection || !criteria) throw new Error('Collection Name and criteria Should be specified');
      if (!(criteria instanceof Object)) throw new Error('Search Criteria should be an object of fields');
      var collectionData = this.getCollection(collection);
      if (!collectionData) return [];
      return Object.entries(collectionData).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            details = _ref4[1];

        if (Memdb.meetSearchCriteria(criteria, details)) {
          collectionData[key] = _objectSpread({}, details, value);
          return collectionData[key];
        }

        return null;
      }).filter(function (details) {
        return !!details;
      });
    }
  }, {
    key: "delete",
    value: function _delete(collection, criteria) {
      if (!collection || !criteria) throw new Error('Collection Name and criteria Should be specified');
      if (!(criteria instanceof Object)) throw new Error('Search Criteria should be an object of fields');
      var collectionData = this.getCollection(collection);
      if (!collectionData) return [];
      return Object.entries(collectionData).map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            key = _ref6[0],
            details = _ref6[1];

        if (Memdb.meetSearchCriteria(criteria, details)) {
          collectionData[key] = {};
          return details;
        }

        return null;
      }).filter(function (details) {
        return !!details;
      });
    }
  }, {
    key: "name",
    get: function get() {
      return this.dbName;
    }
  }], [{
    key: "meetSearchCriteria",
    value: function meetSearchCriteria(criteria, field) {
      var meetCriteria = true;
      if ('id' in criteria && criteria.id == field.id) return true;
      Object.entries(criteria).forEach(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            key = _ref8[0],
            value = _ref8[1];

        if (!(key in field) || field[key] != value) meetCriteria = false;
      });
      return meetCriteria;
    }
  }, {
    key: "getKeyOfDatathatMeetCriteria",
    value: function getKeyOfDatathatMeetCriteria(data, criteria) {
      var collectionData = data;
      if (data instanceof Object && !(data instanceof Array)) collectionData = Object.values(data);
      return collectionData.map(function (details) {
        if (Memdb.meetSearchCriteria(criteria, details)) return details.id;
        return null;
      }).filter(function (details) {
        return !!details;
      });
    }
  }]);

  return Memdb;
}();

exports["default"] = Memdb;
;