"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoanRepayments = exports.createRepayment = void 0;

var _model = require("../model");

var createRepayment = function createRepayment(loan) {
  if (!loan) throw new Error('Loan to query not specified');

  var loanDetails = _model.Loan.find({
    id: loan
  }).data[0];

  var balance = loanDetails.balance,
      paymentInstallment = loanDetails.paymentInstallment;
  var repaymentDetails = {
    amount: balance - paymentInstallment <= 0 ? balance : paymentInstallment,
    loanId: loan
  };

  var _Repayment$insert = _model.Repayment.insert(repaymentDetails),
      data = _Repayment$insert.data;

  var loanBalance = balance - repaymentDetails.amount;
  var repaid = false;
  if (loanBalance === 0) repaid = true;

  _model.Loan.update({
    balance: loanBalance,
    repaid: repaid
  }, {
    id: loan
  });

  return data;
};

exports.createRepayment = createRepayment;

var getLoanRepayments = function getLoanRepayments(loan) {
  if (!loan) throw new Error('Loan to query not specified');
  return _model.Repayment.find({
    loanId: loan
  }).data;
};

exports.getLoanRepayments = getLoanRepayments;