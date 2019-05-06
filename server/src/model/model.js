/**
 * Base class inherited by all models
 * @constructor
 * @param {string} modelName - Name to attach to the model.
 * @param {Object} hooks - An object of hooks functions
 * @example
 * new Model('modelName',{
 *  afterInsert: (data) => {}
 * })
 * Valid Hooks are beforeInsert, afterInsert, afterFind, beforeUpdate
 * afterUpdate, afterDelete
 */

import DB from '../lib/memdb';

import { Validator } from '../lib/schema-validator';

const MemDB = new DB('quick-credit');

export default class Model {
  constructor(modelName, hooks = {}, schema) {
    this.modelName = modelName;
    this.associations = {};
    this.modelAssociation = {};
    // Maps modelName to the type of association so search can be faster
    this.DB = MemDB;
    this.hooks = hooks;
    this.schema = schema;
    this.init(); // initialises the model
  }

  init() {
    if (!this.modelName) return {};
    this.triggerHook('start', this);
    return this.DB.createCollection(this.modelName);
  }

  get Model() {
    return this;
  }

  get foreignKey() {
    const modelName = this.modelName.toLowerCase();
    return `${modelName}Id`;
  }

  get data() {
    return (this.QueryData) ? this.QueryData : {};
  }

  getKeys(modelData) {
    if (modelData === this) return this.foreignKey;
    const { model = modelData } = modelData;
    const modelName = model.modelName.toLowerCase();
    return `${modelName}Id`;
  }

  /**
   * Sets association for a model
   * @param {string} association  -type of association (hasMany, hasOne, belongsTo)
   * @param {Object} model - Model to associate with
   */
  setAssociation(association, model, references = {}) {
    if (!association) throw new Error('Association isnt specified');
    if (!this.associations[association]) this.associations[association] = {};
    const { modelName } = model;
    this.associations[association][modelName] = { model, references };
    this.modelAssociation[modelName] = association;
    return this.associations[association];
  }

  /**
   * Gets models associated to a particular type of association
   * @param {String} association - Type of Association to get (hasMany, hasOne, belongsTo)
   */
  getAssociation(association) {
    if (!association) throw new Error('Association isnt specified');
    const associationName = association.toLowerCase();
    return this.associations[associationName] || {};
  }

  /**
   * Tests for the validity of a model before associating it
   * @param {Object} associatedModel - Model Object to asssociate to
   */
  static validateAssociation(associatedModel) {
    if (!associatedModel) throw new Error('Associated Model Not specified');
    if (!(associatedModel instanceof Model)) throw new Error('Associated Model should be an instance of Model');
    return !!associatedModel.modelName;
  }

  /**
   * HAndles definition of a hasMany assocation
   * @param {Object} associatedModel -Model Object to asssociate to
   */
  hasMany(associatedModel, references) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('hasmany', associatedModel, references);
    return this;
  }

  /**
   * HAndles definition of a hasOne assocation
   * @param {Object} associatedModel -Model Object to asssociate to
   */
  hasOne(associatedModel, references) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('hasone', associatedModel, references);
    return this;
  }

  /**
   * HAndles definition of a belongsTo assocation
   * @param {Object} associatedModel -Model Object to asssociate to
   */
  belongsTo(associatedModel, references) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('belongsto', associatedModel, references);
    return this;
  }

  findAll() {
    const collection = this.modelName;
    this.QueryData = this.DB.findAll(collection);
    this.triggerHook('afterFind', this.QueryData);
    return this;
  }

  find(criteria = {}) {
    const collection = this.modelName;
    this.QueryData = this.DB.find(collection, criteria);
    this.triggerHook('afterFind', this.QueryData);
    return this;
  }

  validateSchema(fields) {
    return new Validator(this.schema).validate(fields);
  }

  insert(data = []) {
    const collection = this.modelName;
    const transformedData = this.triggerHook('beforeInsert', data);
    this.QueryData = this.DB.insert(collection, transformedData);
    this.triggerHook('afterInsert', this.QueryData);
    return this;
  }

  delete(criteria = {}) {
    const collection = this.modelName;
    this.QueryData = this.DB.delete(collection, criteria);
    this.triggerHook('afterDelete', this.QueryData);
    return this;
  }

  update(value = {}, criteria = {}) {
    const collection = this.modelName;
    const transformedValue = this.triggerHook('beforeUpdate', value);
    this.QueryData = this.DB.update(collection, criteria, transformedValue);
    this.triggerHook('afterUpdate', this.QueryData);
    return this;
  }

  associate() {
    const { QueryData } = this;
    // QueryData is an array of results returned from a query
    // foreignKey is used for association with other collections
    const assocationHandlers = {
      hasmany: this.hasManyAssosciationHandler.bind(this),
      hasone: this.hasOneAndBelongsToHandler.bind(this),
      belongsto: this.hasOneAndBelongsToHandler.bind(this),
    };
    if (QueryData) {
      this.QueryData = QueryData.map((data) => {
        let associatedData = {};
        Object.entries(this.associations).map(([key, value]) => {
          const handler = assocationHandlers[key];
          if (!handler) return null;
          const associated = handler(value, data);
          associatedData = { ...associatedData, ...associated };
          return null;
        });
        return { ...data, ...associatedData };
      });
    }
    return this;
  }

  hasManyAssosciationHandler(associations, data = {}) {
    if (!associations) throw new Error('Association can not be undefined');
    if (!(associations instanceof Object)) throw new Error('Association need to be defined as an object');
    const associatedData = {};
    const { id } = data;
    const searchCriteria = {};
    searchCriteria[this.foreignKey] = id;
    Object.entries(associations).map(([searchKey, value]) => {
      const { model, references } = value;
      const {
        criteria = searchCriteria,
        key = searchKey,
      } = Model.getSearchReferenceKey(references, data);
      associatedData[key] = model.find(criteria).QueryData;
      return associatedData[key];
    });
    return associatedData;
  }

  hasOneAndBelongsToHandler(associations, data = {}) {
    if (!associations) throw new Error('Association can not be undefined');
    if (!(associations instanceof Object)) throw new Error('Association need to be defined as an object');
    const associatedData = {};
    Object.entries(associations).map(([searchKey, value]) => {
      const associationKey = this.getKeys(value);
      const id = data[associationKey];
      const searchCriteria = { id };
      const { model, references } = value;
      const {
        criteria = searchCriteria,
        key = searchKey,
      } = Model.getSearchReferenceKey(references, data);
      const associated = model.find(criteria).QueryData;
      [associatedData[key] = null] = associated;
      return associatedData[key];
    });
    return associatedData;
  }

  /**
   * trigeers user supplied hooks once the stage to trigger such as been attained
   * @param {String} hook -Name of the hook to trigger
   * @param {Object} data - Data to pass to the hook
   */
  triggerHook(hook, data = {}) {
    if (!hook) throw new Error('Hook to execute not specified');
    const hookFunction = this.hooks[hook];
    if (!hookFunction && typeof hookFunction !== 'function') return data;
    return hookFunction(data);
  }

  searchForModelInAssociation(modelToSearch) {
    if (!modelToSearch) throw new Error('Model name must be specified');
    const { associations, modelAssociation } = this;
    const modelName = modelAssociation[modelToSearch];
    return associations[modelName][modelToSearch];
  }

  /**
   * Serches for a model by using the data of its associated model as criteria
   * @param {String} associatedModelName -name of the model to search
   * @param {Object} criteria -search criteria
   * @param {String} association -type of association between the models
   */
  searchByAssociation(associatedModelName, criteria = {}, association) {
    if (!associatedModelName) throw new Error('Associated Model name not specified');
    let associatedModel;
    // checks if association is supplied which makes search faster
    if (association) {
      associatedModel = this.getAssociation(association);
      associatedModel = associatedModel[associatedModelName];
    } else {
      // if type of association isnt supplied it searches for the model
      associatedModel = this.searchForModelInAssociation(associatedModelName);
    }
    if (associatedModel) {
      const { model, references } = associatedModel;
      const { QueryData: [associatedData = {}] } = model.find(criteria);
      const modelkey = associatedData[this.foreignKey];
      let {
        criteria: associationSearchCriteria,
      } = Model.getSearchReferenceKey(references, associatedData);
      if (!associationSearchCriteria) associationSearchCriteria = { id: modelkey };
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
  static getSearchReferenceKey(references, data) {
    const associationSearchCriteria = {};
    const referenceKey = Object.keys(references)[0];
    if (!referenceKey) return {};
    const referenceKeyValue = data[referenceKey];
    if (!referenceKeyValue) return {};
    const modelMappedKey = references[referenceKey];
    associationSearchCriteria[modelMappedKey] = referenceKeyValue;
    return { criteria: associationSearchCriteria, key: referenceKey };
  }
}
