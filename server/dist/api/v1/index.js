"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _error = require("../../lib/error");

var _auth = require("./controllers/auth");

var _user = require("./controllers/user");

var _loan = require("./controllers/loan");

var _repayment = require("./controllers/repayment");

var router = (0, _express.Router)();
router.route('/auth/signup').post(_auth.signup).all(function () {
  throw new _error.MethodNotAllowedError();
});
router.route('/auth/signin').post(_auth.signin).all(function () {
  throw new _error.MethodNotAllowedError();
});
router.route('/users/:email/verify').patch(_user.verify).all(function () {
  throw new _error.MethodNotAllowedError();
});
router.route('/loans/:loan').get(_loan.getLoan).patch(_loan.loanStatus).all(function () {
  throw new _error.MethodNotAllowedError();
});
router.route('/loans/:loan/repayments').get(_repayment.getLoanRepayments).post(_repayment.postLoanRepayment).all(function () {
  throw new _error.MethodNotAllowedError();
});
router.route('/loans').get(_loan.getAllLoans).post(_loan.applyForLoan).all(function () {
  throw new _error.MethodNotAllowedError();
});
router.route('/users').get(_user.getUsers).all(function () {
  throw new _error.MethodNotAllowedError();
});
router.route('/users/:email').get(_user.getUser).all(function () {
  throw new _error.MethodNotAllowedError();
});
var _default = router;
exports["default"] = _default;