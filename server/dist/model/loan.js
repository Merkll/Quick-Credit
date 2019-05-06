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
  var Loan =
  /*#__PURE__*/
  function (_Model) {
    _inherits(Loan, _Model);

    function Loan(modelName, schema, hooks) {
      _classCallCheck(this, Loan);

      return _possibleConstructorReturn(this, _getPrototypeOf(Loan).call(this, modelName, hooks, schema));
    }

    return Loan;
  }(Model);

  var LoanModel = new Loan('Loan', {
    id: _schemaValidator.FieldTypes.Integer,
    user: _schemaValidator.FieldTypes.String,
    CreatedOn: _schemaValidator.FieldTypes.Date,
    status: _schemaValidator.FieldTypes.String,
    repaid: _schemaValidator.FieldTypes.Boolean,
    tenor: _schemaValidator.FieldTypes.Integer,
    amount: _schemaValidator.FieldTypes.Number,
    paymentInstallment: _schemaValidator.FieldTypes.Number,
    balance: _schemaValidator.FieldTypes.Number,
    interest: _schemaValidator.FieldTypes.Number,
    purpose: _schemaValidator.FieldTypes.String
  }, {
    beforeInsert: function beforeInsert(data) {
      var details = data;
      if (!(details instanceof Array)) details = [details];
      return details.map(function (detail) {
        var loanData = detail;
        var interest = loanData.amount * 0.05;
        loanData.interest = parseFloat(interest.toFixed(2));
        var installment = (loanData.amount + loanData.interest) / loanData.tenor;
        loanData.paymentInstallment = parseFloat(installment.toFixed(2));
        loanData.createdOn = new Date();
        loanData.balance = loanData.amount + loanData.interest;
        return loanData;
      });
    },
    beforeUpdate: function beforeUpdate(data) {
      var details = data;
      details.updatedOn = new Date();
      return details;
    }
  });

  LoanModel.buildAssociation = function (Models) {
    LoanModel.belongsTo(Models.User);
    LoanModel.hasMany(Models.Repayment);
  };

  return LoanModel;
};

exports["default"] = _default;