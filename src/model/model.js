/**
 * Base class inherited by all models
 * functionality to implement
 * 1. Model associations
 *    *hasMany --
 *    *hasOne --
 *    *belongsTo --
 * 2. Query of all associated Models --
 * 3. Search by Associated Models
 * 4. Hooks for afterInsert, afterUpdate, afterDelete, --
 *    afterFind, beforeInsert, beforeUpdate, beforeDelete
 */
const MemDB = require('./index');

module.exports = class Model {
  constructor(modelName, hooks = {}, db = MemDB) {
    this.modelName = modelName;
    this.associations = {};
    this.DB = db;
    this.hooks = hooks;
    this.init();
  }

  init() {
    if (!this.modelName) return {};
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

  setAssociation(association, model) {
    if (!association) throw new Error('Association isnt specified');
    if (!this.associations[association]) this.associations[association] = {};
    const { modelName } = model;
    this.associations[association][modelName] = model;
    return this.associations[association];
  }

  getAssociation(association) {
    if (!association) throw new Error('Association isnt specified');
    const associationName = association.toLowerCase();
    return this.associations[associationName] || {};
  }

  static validateAssociation(associatedModel) {
    if (!associatedModel) throw new Error('Associated Model Not specified');
    if (!(associatedModel instanceof Model)) throw new Error('Associated Model should be an instance of Model');
    return !!associatedModel.modelName;
  }

  hasMany(associatedModel) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('hasmany', associatedModel);
    return this;
  }

  hasOne(associatedModel) {
    if (Model.validateAssociation(associatedModel)) this.setAssociation('hasone', associatedModel);
    return this;
  }

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

  triggerHook(hook, data = {}) {
    if (!hook) throw new Error('Hook to execute not specified');
    const hookFunction = this.hooks[hook];
    if (!hookFunction && typeof hookFunction !== 'function') return data;
    return hookFunction(data);
  }
};
