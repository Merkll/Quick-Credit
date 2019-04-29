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

const DB = require('../lib/memdb');

const MemDB = new DB('quick-credit');

module.exports = class Model {
  constructor(modelName, hooks = {}) {
    this.modelName = modelName;
    this.associations = {};
    this.modelAssociation = {};
    // Maps modelName to the type of association so search can be faster
    this.DB = MemDB;
    this.hooks = hooks;
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
    return `${this.modelName}Id`;
  }

  get data() {
    return (this.QueryData) ? this.QueryData : {};
  }

  getKeys(model) {
    if (model === this) return this.foreignKey;
    return `${model.modelName}Id`;
  }

  /**
   * Sets association for a model
   * @param {string} association  -type of association (hasMany, hasOne, belongsTo)
   * @param {Object} model - Model to associate with
   */
  setAssociation(association, model) {
    if (!association) throw new Error('Association isnt specified');
    if (!this.associations[association]) this.associations[association] = {};
    const { modelName } = model;
    this.associations[association][modelName] = model;
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
  hasMany(associatedModel) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('hasmany', associatedModel);
    return this;
  }

  /**
   * HAndles definition of a hasOne assocation
   * @param {Object} associatedModel -Model Object to asssociate to
   */
  hasOne(associatedModel) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('hasone', associatedModel);
    return this;
  }

  /**
   * HAndles definition of a belongsTo assocation
   * @param {Object} associatedModel -Model Object to asssociate to
   */
  belongsTo(associatedModel) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('belongsto', associatedModel);
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
    const criteria = {};
    criteria[this.foreignKey] = id;
    Object.entries(associations).map(([key, value]) => {
      associatedData[key] = value.find(criteria).QueryData;
      return associatedData[key];
    });
    return associatedData;
  }

  hasOneAndBelongsToHandler(associations, data = {}) {
    if (!associations) throw new Error('Association can not be undefined');
    if (!(associations instanceof Object)) throw new Error('Association need to be defined as an object');
    const associatedData = {};
    Object.entries(associations).map(([key, value]) => {
      const associationKey = this.getKeys(value);
      const id = data[associationKey];
      const criteria = { id };
      const associated = value.find(criteria).QueryData;
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

  searchForModelInAssociation(modelName) {
    if (!modelName) throw new Error('Model name must be specified');
    const { associations, modelAssociation } = this;
    const model = modelAssociation[modelName];
    return associations[model][modelName];
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
      const { QueryData: [associatedData] } = associatedModel.find(criteria);
      const modelId = associatedData[this.foreignKey];
      this.QueryData = this.find({ id: modelId }).QueryData;
    }
    return this;
  }
};
