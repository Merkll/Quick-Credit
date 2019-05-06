"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLoanRepayment = exports.getLoanRepayments = void 0;

var _error = require("../../../lib/error");

var _repayment = require("../../../services/repayment");

var _loan = require("../../../services/loan");

var _response = _interopRequireDefault(require("../../../lib/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getLoanRepayments = function getLoanRepayments(req, res) {
  var loan = req.params.loan;
  var data = (0, _repayment.getLoanRepayments)(loan);
  if (data.length === 0) throw new _error.NotFoundError('No repayment for that loan found');
  var response = new _response["default"](data);
  res.status(response.status).json(response);
};

exports.getLoanRepayments = getLoanRepayments;

var postLoanRepayment = function postLoanRepayment(req, res) {
  var loan = req.params.loan;
  var loanDetails = (0, _loan.getLoan)(loan);
  if (!loanDetails) throw new _error.NotFoundError('loan with that id not found');
  var data = (0, _repayment.createRepayment)(loan);
  var response = new _response["default"](data);
  res.status(response.status).json(response);
};

exports.postLoanRepayment = postLoanRepayment;