"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _schemaValidator = require("../lib/schema-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _default = function _default(Model) {
  var User =
  /*#__PURE__*/
  function (_Model) {
    _inherits(User, _Model);

    function User(modelName, schema, hooks) {
      _classCallCheck(this, User);

      return _possibleConstructorReturn(this, _getPrototypeOf(User).call(this, modelName, hooks, schema));
    }

    return User;
  }(Model);

  var UserModel = new User('User', {
    id: _schemaValidator.FieldTypes.Integer,
    createdOn: _schemaValidator.FieldTypes.Date,
    email: _schemaValidator.FieldTypes.String,
    firstName: _schemaValidator.FieldTypes.String,
    lastName: _schemaValidator.FieldTypes.String,
    password: _schemaValidator.FieldTypes.String,
    address: _schemaValidator.FieldTypes.String,
    status: _schemaValidator.FieldTypes.String,
    isAdmin: _schemaValidator.FieldTypes.Boolean
  }, {
    beforeInsert: function beforeInsert(data) {
      var details = data;
      if (!(details instanceof Array)) details = [details];
      return details.map(function (detail) {
        var userDetails = detail;

        var hash = _bcrypt["default"].hashSync(userDetails.password, 10);

        userDetails.password = hash;
        userDetails.status = 'unverified';
        userDetails.isAdmin = userDetails.isAdmin || false;
        userDetails.createdOn = new Date();
        return userDetails;
      });
    },
    beforeUpdate: function beforeUpdate(data) {
      var details = data;
      details.updatedOn = new Date();
      if (details.password) details.password = _bcrypt["default"].hashSync(details.password, 10);
      return details;
    }
  });

  UserModel.buildAssociation = function (Models) {
    UserModel.hasMany(Models.Loan);
    UserModel.hasMany(Models.Message);
  };

  return UserModel;
};

exports["default"] = _default;