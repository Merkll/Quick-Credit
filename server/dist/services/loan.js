"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeLoanStatus = exports.newLoan = exports.getAllLoans = exports.getRepaidLoans = exports.getCurrentLoans = exports.getLoan = void 0;

var _model = require("../model");

var getLoan = function getLoan(loan) {
  if (!loan) throw new Error('Loan to query not specified');
  return _model.Loan.find({
    id: loan
  }).data[0];
};

exports.getLoan = getLoan;

var getCurrentLoans = function getCurrentLoans() {
  return _model.Loan.find({
    status: 'approved',
    repaid: false
  }).data;
};

exports.getCurrentLoans = getCurrentLoans;

var getRepaidLoans = function getRepaidLoans() {
  return _model.Loan.find({
    status: 'approved',
    repaid: true
  }).data;
};

exports.getRepaidLoans = getRepaidLoans;

var getAllLoans = function getAllLoans() {
  return _model.Loan.findAll().data;
};

exports.getAllLoans = getAllLoans;

var newLoan = function newLoan(loanDetails) {
  if (!loanDetails) throw new Error('Loan details cant be empty');
  if (!_model.Loan.validateSchema(loanDetails)) return {
    error: 'Invalid Loan Details'
  };

  var details = _model.Loan.insert(loanDetails).data;

  return details;
};

exports.newLoan = newLoan;

var changeLoanStatus = function changeLoanStatus(_ref) {
  var loan = _ref.loan,
      status = _ref.status;
  if (status !== 'approved' && status !== 'rejected') return {
    error: 'Status should either be "approved" or "rejected"'
  };
  return _model.Loan.update({
    status: status
  }, {
    id: loan
  }).data[0];
};

exports.changeLoanStatus = changeLoanStatus;