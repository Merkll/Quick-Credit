"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signup = void 0;

var _error = require("../../../lib/error");

var _auth = require("../../../services/auth");

var _response = _interopRequireDefault(require("../../../lib/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signup = function signup(req, res) {
  var requestBody = req.body;

  if (!requestBody || Object.keys(requestBody).length === 0) {
    throw new _error.InvalidRequestBodyError('Post Body required');
  }

  var data = (0, _auth.Signup)(requestBody);
  if (data.error) throw new _error.UserExists(data.error);
  var response = new _response["default"](data, 201);
  res.status(201).json(response);
};

exports.signup = signup;

var signin = function signin(req, res) {
  var requestBody = req.body;

  if (!requestBody || Object.keys(requestBody).length === 0) {
    throw new _error.InvalidRequestBodyError('Post Body required');
  }

  var data = (0, _auth.Signin)(requestBody);
  if (data.error) throw new _error.AuthenticationError(data.error);
  var response = new _response["default"](data, 200);
  res.status(200).json(response);
};

exports.signin = signin;