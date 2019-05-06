"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _schemaValidator = require("../lib/schema-validator");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _default = function _default(Model) {
  var Message =
  /*#__PURE__*/
  function (_Model) {
    _inherits(Message, _Model);

    function Message(modelName, schema, hooks) {
      _classCallCheck(this, Message);

      return _possibleConstructorReturn(this, _getPrototypeOf(Message).call(this, modelName, hooks, schema));
    }

    return Message;
  }(Model);

  var MessageModel = new Message('Message', {
    id: _schemaValidator.FieldTypes.Integer,
    createdOn: _schemaValidator.FieldTypes.Date,
    sender: _schemaValidator.FieldTypes.Integer,
    repliedTo: _schemaValidator.FieldTypes.Integer,
    recipient: _schemaValidator.FieldTypes.Integer,
    body: _schemaValidator.FieldTypes.String,
    subject: _schemaValidator.FieldTypes.String,
    excerpt: _schemaValidator.FieldTypes.String
  }, {
    beforeInsert: function beforeInsert(data) {
      var details = data;
      if (!(details instanceof Array)) details = [details];
      return details.map(function (detail) {
        var messageData = detail;
        messageData.createdOn = new Date();
        return messageData;
      });
    },
    beforeUpdate: function beforeUpdate(data) {
      var details = data;
      details.updatedOn = new Date();
      return details;
    }
  });

  MessageModel.buildAssociation = function (Models) {
    MessageModel.hasMany(Models.Message, {
      repliedTo: 'id'
    });
    MessageModel.hasOne(Models.User, {
      recipient: 'id'
    });
    MessageModel.belongsTo(Models.User, {
      sender: 'id'
    });
  };

  return MessageModel;
};

exports["default"] = _default;