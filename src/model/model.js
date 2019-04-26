/**
 * Base class inherited by all models
 * functionality to implement
 * 1. Model associations
 *    *hasMany --
 *    *hasOne --
 *    *belongsTo
 * 2. Query of all associated Models
 * 3. Search by Associated Models
 * 4. Hooks for afterSave, afterUpdate, afterDelete,
 *    afterFind, beforeSave, beforeUpdate, beforeDelete
 */

module.exports = class Model {
  constructor(modelName) {
    this.modelName = modelName;
    this.associations = {};
  }

  get Model() {
    return this;
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
    return this.associations[association] || {};
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
};
