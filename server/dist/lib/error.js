"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidRequestBodyError = exports.MethodNotAllowedError = exports.AuthorizationError = exports.AuthenticationError = exports.UserExists = exports.NotFoundError = exports.ResourceNotFoundError = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Defines all Major Errors that can be thrown by the request to the application
 *
 */
var ApplicationError =
/*#__PURE__*/
function (_Error) {
  _inherits(ApplicationError, _Error);

  function ApplicationError(error, status) {
    var _this;

    _classCallCheck(this, ApplicationError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ApplicationError).call(this));
    Error.captureStackTrace(_assertThisInitialized(_this), _this.constructor);
    _this.status = status;
    _this.error = error;
    return _this;
  }

  return ApplicationError;
}(_wrapNativeSuper(Error));

var ResourceNotFoundError =
/*#__PURE__*/
function (_ApplicationError) {
  _inherits(ResourceNotFoundError, _ApplicationError);

  function ResourceNotFoundError(message) {
    _classCallCheck(this, ResourceNotFoundError);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResourceNotFoundError).call(this, message || 'Resource requested doesnt exist', 404));
  }

  return ResourceNotFoundError;
}(ApplicationError);

exports.ResourceNotFoundError = ResourceNotFoundError;

var NotFoundError =
/*#__PURE__*/
function (_ApplicationError2) {
  _inherits(NotFoundError, _ApplicationError2);

  function NotFoundError(message) {
    _classCallCheck(this, NotFoundError);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotFoundError).call(this, message || 'No Record found matching that criteria', 404));
  }

  return NotFoundError;
}(ApplicationError);

exports.NotFoundError = NotFoundError;

var UserExists =
/*#__PURE__*/
function (_ApplicationError3) {
  _inherits(UserExists, _ApplicationError3);

  function UserExists(message) {
    _classCallCheck(this, UserExists);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserExists).call(this, message || 'User with that email already exist', 400));
  }

  return UserExists;
}(ApplicationError);

exports.UserExists = UserExists;

var AuthenticationError =
/*#__PURE__*/
function (_ApplicationError4) {
  _inherits(AuthenticationError, _ApplicationError4);

  function AuthenticationError(message) {
    _classCallCheck(this, AuthenticationError);

    return _possibleConstructorReturn(this, _getPrototypeOf(AuthenticationError).call(this, message || 'Could not authenticate you', 401));
  }

  return AuthenticationError;
}(ApplicationError);

exports.AuthenticationError = AuthenticationError;

var AuthorizationError =
/*#__PURE__*/
function (_ApplicationError5) {
  _inherits(AuthorizationError, _ApplicationError5);

  function AuthorizationError(message) {
    _classCallCheck(this, AuthorizationError);

    return _possibleConstructorReturn(this, _getPrototypeOf(AuthorizationError).call(this, message || 'You are not authorized to perform that action', 403));
  }

  return AuthorizationError;
}(ApplicationError);

exports.AuthorizationError = AuthorizationError;

var MethodNotAllowedError =
/*#__PURE__*/
function (_ApplicationError6) {
  _inherits(MethodNotAllowedError, _ApplicationError6);

  function MethodNotAllowedError(message) {
    _classCallCheck(this, MethodNotAllowedError);

    return _possibleConstructorReturn(this, _getPrototypeOf(MethodNotAllowedError).call(this, message || 'Request Method Not allowed for this resource', 405));
  }

  return MethodNotAllowedError;
}(ApplicationError);

exports.MethodNotAllowedError = MethodNotAllowedError;

var InvalidRequestBodyError =
/*#__PURE__*/
function (_ApplicationError7) {
  _inherits(InvalidRequestBodyError, _ApplicationError7);

  function InvalidRequestBodyError(message) {
    _classCallCheck(this, InvalidRequestBodyError);

    return _possibleConstructorReturn(this, _getPrototypeOf(InvalidRequestBodyError).call(this, message || 'Invalid Request Body', 422));
  }

  return InvalidRequestBodyError;
}(ApplicationError);

exports.InvalidRequestBodyError = InvalidRequestBodyError;