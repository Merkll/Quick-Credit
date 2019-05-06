"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.getUsers = exports.verify = void 0;

var _error = require("../../../lib/error");

var _user = require("../../../services/user");

var _response = _interopRequireDefault(require("../../../lib/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verify = function verify(req, res) {
  var email = req.params.email;
  var data = (0, _user.verify)(email);
  if (!data) throw new _error.NotFoundError('User with that email address doesnt exist');
  var response = new _response["default"](data);
  res.status(response.status).json(response);
};

exports.verify = verify;

var getUsers = function getUsers(req, res) {
  var statusEnums = ['verified', 'unverified'];
  var status = req.query.status;
  var data;
  if (statusEnums.includes(status)) data = (0, _user.filterUsers)({
    status: status
  });else data = (0, _user.getAllUsers)();
  var response = new _response["default"](data);
  res.status(response.status).json(response);
};

exports.getUsers = getUsers;

var getUser = function getUser(req, res) {
  var email = req.params.email;
  var data = (0, _user.getUser)(email);
  if (!data) throw new _error.NotFoundError('User with that email address doesnt exist');
  var response = new _response["default"](data);
  res.status(response.status).json(response);
};

exports.getUser = getUser;