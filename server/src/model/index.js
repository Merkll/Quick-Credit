/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

/**
 * This dynamically loads all model files and stores them in a hash table
 * to ensure availability of all models and prevent cyclic dpendencies
 */

import fs from 'fs';

import path from 'path';
import Model from './model';

const basename = path.basename(__filename);
const exempted = ['model.js'];

const requireModels = () => {
  const models = {};
  fs.readdirSync(__dirname)
    .filter(file => !exempted.includes(file) && file !== basename)
  // ensures current file and model.js isnt loaded
    .forEach((file) => {
      const model = require(path.join(__dirname, file)).default(Model);
      // loads each model file
      models[model.modelName] = model;
    });
  return models;
};

const buildAssociation = (models) => {
  Object.keys(models).forEach((modelName) => {
  // build association for all model if any
    models[modelName].buildAssociation(models);
  });
};

const models = requireModels();
buildAssociation(models);

module.exports = models;
