"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-dynamic-require */

/* eslint-disable global-require */

/**
 * This dynamically loads all model files and stores them in a hash table
 * to ensure availability of all models and prevent cyclic dpendencies
 */
var basename = _path["default"].basename(__filename);

var exempted = ['model.js'];

var requireModels = function requireModels() {
  var models = {};

  _fs["default"].readdirSync(__dirname).filter(function (file) {
    return !exempted.includes(file) && file !== basename;
  }) // ensures current file and model.js isnt loaded
  .forEach(function (file) {
    var model = require(_path["default"].join(__dirname, file))["default"](_model["default"]); // loads each model file


    models[model.modelName] = model;
  });

  return models;
};

var buildAssociation = function buildAssociation(models) {
  Object.keys(models).forEach(function (modelName) {
    // build association for all model if any
    models[modelName].buildAssociation(models);
  });
};

var models = requireModels();
buildAssociation(models);
module.exports = models;