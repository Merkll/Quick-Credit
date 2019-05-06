"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = exports.Signup = exports.Signin = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _model = require("../model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tokenSecret = process.env.SECRET || 'quickcredite435rt';

var Signin = function Signin(_ref) {
  var email = _ref.email,
      password = _ref.password;
  if (!email || !password) throw new Error('Email and Password required for autjentication');

  var authData = _model.User.find({
    email: email
  }).data[0];

  if (!authData) return {
    error: 'User Email doesnt exist'
  };

  var isValid = _bcrypt["default"].compareSync(password, authData.password);

  if (!isValid) return {
    error: 'Password and email doesnt match'
  };
  var id = authData.id,
      isAdmin = authData.isAdmin;

  var token = _jsonwebtoken["default"].sign({
    id: id,
    isAdmin: isAdmin,
    email: email
  }, tokenSecret);

  return _objectSpread({
    token: token
  }, authData);
};

exports.Signin = Signin;

var Signup = function Signup(userDetails) {
  if (!userDetails) throw new Error('User Details is required');
  var email = userDetails.email,
      password = userDetails.password;
  var userExist = !!_model.User.find({
    email: email
  }).data[0];
  if (userExist) return {
    error: 'User With that email already exists'
  };
  if (!_model.User.validateSchema(userDetails)) return {
    error: 'Invalid User Details'
  };

  _model.User.insert(userDetails);

  return Signin({
    email: email,
    password: password
  });
};

exports.Signup = Signup;

var validateToken = function validateToken(token) {
  try {
    var _jwt$verify = _jsonwebtoken["default"].verify(token, tokenSecret),
        id = _jwt$verify.id;

    var data = _model.User.find({
      id: id
    }).data[0];

    if (!data) return {
      error: 'Cannot retrieve a user for the specified token.'
    };
    return _objectSpread({
      token: token
    }, data);
  } catch (error) {
    return {
      error: 'Invalid Access token'
    };
  }
};

exports.validateToken = validateToken;