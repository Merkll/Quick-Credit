"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _memdb = _interopRequireDefault(require("../lib/memdb"));

var _schemaValidator = require("../lib/schema-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MemDB = new _memdb["default"]('quick-credit');

var Model =
/*#__PURE__*/
function () {
  function Model(modelName) {
    var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var schema = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, Model);

    this.modelName = modelName;
    this.associations = {};
    this.modelAssociation = {}; // Maps modelName to the type of association so search can be faster

    this.DB = MemDB;
    this.hooks = hooks;
    this.schema = schema;
    this.init(); // initialises the model
  }

  _createClass(Model, [{
    key: "init",
    value: function init() {
      if (!this.modelName) return {};
      this.triggerHook('start', this);
      return this.DB.createCollection(this.modelName);
    }
  }, {
    key: "getKeys",
    value: function getKeys(modelData) {
      if (modelData === this) return this.foreignKey;
      var _modelData$model = modelData.model,
          model = _modelData$model === void 0 ? modelData : _modelData$model;
      var modelName = model.modelName.toLowerCase();
      return "".concat(modelName, "Id");
    }
    /**
     * Sets association for a model
     * @param {string} association  -type of association (hasMany, hasOne, belongsTo)
     * @param {Object} model - Model to associate with
     */

  }, {
    key: "setAssociation",
    value: function setAssociation(association, model) {
      var references = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!association) throw new Error('Association isnt specified');
      if (!this.associations[association]) this.associations[association] = {};
      var modelName = model.modelName;
      this.associations[association][modelName] = {
        model: model,
        references: references
      };
      this.modelAssociation[modelName] = association;
      return this.associations[association];
    }
    /**
     * Gets models associated to a particular type of association
     * @param {String} association - Type of Association to get (hasMany, hasOne, belongsTo)
     */

  }, {
    key: "getAssociation",
    value: function getAssociation(association) {
      if (!association) throw new Error('Association isnt specified');
      var associationName = association.toLowerCase();
      return this.associations[associationName] || {};
    }
    /**
     * Tests for the validity of a model before associating it
     * @param {Object} associatedModel - Model Object to asssociate to
     */

  }, {
    key: "hasMany",

    /**
     * HAndles definition of a hasMany assocation
     * @param {Object} associatedModel -Model Object to asssociate to
     */
    value: function hasMany(associatedModel, references) {
      if (Model.validateAssociation(associatedModel)) this.setAssociation('hasmany', associatedModel, references);
      return this;
    }
    /**
     * HAndles definition of a hasOne assocation
     * @param {Object} associatedModel -Model Object to asssociate to
     */

  }, {
    key: "hasOne",
    value: function hasOne(associatedModel, references) {
      if (Model.validateAssociation(associatedModel)) this.setAssociation('hasone', associatedModel, references);
      return this;
    }
    /**
     * HAndles definition of a belongsTo assocation
     * @param {Object} associatedModel -Model Object to asssociate to
     */

  }, {
    key: "belongsTo",
    value: function belongsTo(associatedModel, references) {
      if (Model.validateAssociation(associatedModel)) this.setAssociation('belongsto', associatedModel, references);
      return this;
    }
  }, {
    key: "findAll",
    value: function findAll() {
      var collection = this.modelName;
      this.QueryData = this.DB.findAll(collection);
      this.triggerHook('afterFind', this.QueryData);
      return this;
    }
  }, {
    key: "find",
    value: function find() {
      var criteria = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var collection = this.modelName;
      this.QueryData = this.DB.find(collection, criteria);
      this.triggerHook('afterFind', this.QueryData);
      return this;
    }
  }, {
    key: "validateSchema",
    value: function validateSchema(fields) {
      return new _schemaValidator.Validator(this.schema).validate(fields);
    }
  }, {
    key: "insert",
    value: function insert() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var collection = this.modelName;
      var transformedData = this.triggerHook('beforeInsert', data);
      this.QueryData = this.DB.insert(collection, transformedData);
      this.triggerHook('afterInsert', this.QueryData);
      return this;
    }
  }, {
    key: "delete",
    value: function _delete() {
      var criteria = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var collection = this.modelName;
      this.QueryData = this.DB["delete"](collection, criteria);
      this.triggerHook('afterDelete', this.QueryData);
      return this;
    }
  }, {
    key: "update",
    value: function update() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var criteria = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var collection = this.modelName;
      var transformedValue = this.triggerHook('beforeUpdate', value);
      this.QueryData = this.DB.update(collection, criteria, transformedValue);
      this.triggerHook('afterUpdate', this.QueryData);
      return this;
    }
  }, {
    key: "associate",
    value: function associate() {
      var _this = this;

      var QueryData = this.QueryData; // QueryData is an array of results returned from a query
      // foreignKey is used for association with other collections

      var assocationHandlers = {
        hasmany: this.hasManyAssosciationHandler.bind(this),
        hasone: this.hasOneAndBelongsToHandler.bind(this),
        belongsto: this.hasOneAndBelongsToHandler.bind(this)
      };

      if (QueryData) {
        this.QueryData = QueryData.map(function (data) {
          var associatedData = {};
          Object.entries(_this.associations).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            var handler = assocationHandlers[key];
            if (!handler) return null;
            var associated = handler(value, data);
            associatedData = _objectSpread({}, associatedData, associated);
            return null;
          });
          return _objectSpread({}, data, associatedData);
        });
      }

      return this;
    }
  }, {
    key: "hasManyAssosciationHandler",
    value: function hasManyAssosciationHandler(associations) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!associations) throw new Error('Association can not be undefined');
      if (!(associations instanceof Object)) throw new Error('Association need to be defined as an object');
      var associatedData = {};
      var id = data.id;
      var searchCriteria = {};
      searchCriteria[this.foreignKey] = id;
      Object.entries(associations).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            searchKey = _ref4[0],
            value = _ref4[1];

        var model = value.model,
            references = value.references;

        var _Model$getSearchRefer = Model.getSearchReferenceKey(references, data),
            _Model$getSearchRefer2 = _Model$getSearchRefer.criteria,
            criteria = _Model$getSearchRefer2 === void 0 ? searchCriteria : _Model$getSearchRefer2,
            _Model$getSearchRefer3 = _Model$getSearchRefer.key,
            key = _Model$getSearchRefer3 === void 0 ? searchKey : _Model$getSearchRefer3;

        associatedData[key] = model.find(criteria).QueryData;
        return associatedData[key];
      });
      return associatedData;
    }
  }, {
    key: "hasOneAndBelongsToHandler",
    value: function hasOneAndBelongsToHandler(associations) {
      var _this2 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!associations) throw new Error('Association can not be undefined');
      if (!(associations instanceof Object)) throw new Error('Association need to be defined as an object');
      var associatedData = {};
      Object.entries(associations).map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            searchKey = _ref6[0],
            value = _ref6[1];

        var associationKey = _this2.getKeys(value);

        var id = data[associationKey];
        var searchCriteria = {
          id: id
        };
        var model = value.model,
            references = value.references;

        var _Model$getSearchRefer4 = Model.getSearchReferenceKey(references, data),
            _Model$getSearchRefer5 = _Model$getSearchRefer4.criteria,
            criteria = _Model$getSearchRefer5 === void 0 ? searchCriteria : _Model$getSearchRefer5,
            _Model$getSearchRefer6 = _Model$getSearchRefer4.key,
            key = _Model$getSearchRefer6 === void 0 ? searchKey : _Model$getSearchRefer6;

        var associated = model.find(criteria).QueryData;

        var _associated = _slicedToArray(associated, 1);

        var _associated$ = _associated[0];
        associatedData[key] = _associated$ === void 0 ? null : _associated$;
        return associatedData[key];
      });
      return associatedData;
    }
    /**
     * trigeers user supplied hooks once the stage to trigger such as been attained
     * @param {String} hook -Name of the hook to trigger
     * @param {Object} data - Data to pass to the hook
     */

  }, {
    key: "triggerHook",
    value: function triggerHook(hook) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!hook) throw new Error('Hook to execute not specified');
      var hookFunction = this.hooks[hook];
      if (!hookFunction && typeof hookFunction !== 'function') return data;
      return hookFunction(data);
    }
  }, {
    key: "searchForModelInAssociation",
    value: function searchForModelInAssociation(modelToSearch) {
      if (!modelToSearch) throw new Error('Model name must be specified');
      var associations = this.associations,
          modelAssociation = this.modelAssociation;
      var modelName = modelAssociation[modelToSearch];
      return associations[modelName][modelToSearch];
    }
    /**
     * Serches for a model by using the data of its associated model as criteria
     * @param {String} associatedModelName -name of the model to search
     * @param {Object} criteria -search criteria
     * @param {String} association -type of association between the models
     */

  }, {
    key: "searchByAssociation",
    value: function searchByAssociation(associatedModelName) {
      var criteria = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var association = arguments.length > 2 ? arguments[2] : undefined;
      if (!associatedModelName) throw new Error('Associated Model name not specified');
      var associatedModel; // checks if association is supplied which makes search faster

      if (association) {
        associatedModel = this.getAssociation(association);
        associatedModel = associatedModel[associatedModelName];
      } else {
        // if type of association isnt supplied it searches for the model
        associatedModel = this.searchForModelInAssociation(associatedModelName);
      }

      if (associatedModel) {
        var _associatedModel = associatedModel,
            model = _associatedModel.model,
            references = _associatedModel.references;

        var _model$find = model.find(criteria),
            _model$find$QueryData = _slicedToArray(_model$find.QueryData, 1),
            _model$find$QueryData2 = _model$find$QueryData[0],
            associatedData = _model$find$QueryData2 === void 0 ? {} : _model$find$QueryData2;

        var modelkey = associatedData[this.foreignKey];

        var _Model$getSearchRefer7 = Model.getSearchReferenceKey(references, associatedData),
            associationSearchCriteria = _Model$getSearchRefer7.criteria;

        if (!associationSearchCriteria) associationSearchCriteria = {
          id: modelkey
        };
        this.QueryData = this.find(associationSearchCriteria).QueryData;
      }

      return this;
    }
    /**
     * gets the search criteria based on the refernces provided.
     * it maps the key in the refence provided to the data attribute
     * @param {*} references
     * @param {*} data
     */

  }, {
    key: "Model",
    get: function get() {
      return this;
    }
  }, {
    key: "foreignKey",
    get: function get() {
      var modelName = this.modelName.toLowerCase();
      return "".concat(modelName, "Id");
    }
  }, {
    key: "data",
    get: function get() {
      return this.QueryData ? this.QueryData : {};
    }
  }], [{
    key: "validateAssociation",
    value: function validateAssociation(associatedModel) {
      if (!associatedModel) throw new Error('Associated Model Not specified');
      if (!(associatedModel instanceof Model)) throw new Error('Associated Model should be an instance of Model');
      return !!associatedModel.modelName;
    }
  }, {
    key: "getSearchReferenceKey",
    value: function getSearchReferenceKey(references, data) {
      var associationSearchCriteria = {};
      var referenceKey = Object.keys(references)[0];
      if (!referenceKey) return {};
      var referenceKeyValue = data[referenceKey];
      if (!referenceKeyValue) return {};
      var modelMappedKey = references[referenceKey];
      associationSearchCriteria[modelMappedKey] = referenceKeyValue;
      return {
        criteria: associationSearchCriteria,
        key: referenceKey
      };
    }
  }]);

  return Model;
}();

exports["default"] = Model;