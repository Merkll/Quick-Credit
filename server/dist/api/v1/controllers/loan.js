"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loanStatus = exports.applyForLoan = exports.getAllLoans = exports.getLoan = void 0;

var _error = require("../../../lib/error");

var _loan = require("../../../services/loan");

var _response = _interopRequireDefault(require("../../../lib/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getLoan = function getLoan(req, res) {
  var loan = req.params.loan;
  var data = (0, _loan.getLoan)(loan);
  if (!data) throw new _error.NotFoundError('loan with that id not found');
  var response = new _response["default"](data);
  res.status(response.status).json(response);
};

exports.getLoan = getLoan;

var getAllLoans = function getAllLoans(req, res) {
  var _req$query = req.query,
      status = _req$query.status,
      repaid = _req$query.repaid;
  var data;
  if (status === 'approved' && repaid === 'false') data = (0, _loan.getCurrentLoans)();else if (status === 'approved' && repaid === 'true') data = (0, _loan.getRepaidLoans)();else data = (0, _loan.getAllLoans)();
  var response = new _response["default"](data);
  res.status(response.status).json(response);
};

exports.getAllLoans = getAllLoans;

var applyForLoan = function applyForLoan(req, res) {
  var requestBody = req.body;

  if (!requestBody || Object.keys(requestBody).length === 0) {
    throw new _error.InvalidRequestBodyError('Post Body required');
  }

  var data = (0, _loan.newLoan)(requestBody);
  var response = new _response["default"](data, 201);
  res.status(response.status).json(response);
};

exports.applyForLoan = applyForLoan;

var loanStatus = function loanStatus(req, res) {
  var status = req.body.status;
  var loan = req.params.loan;
  if (!(status === 'approved' || status === 'rejected')) throw new _error.InvalidRequestBodyError('Invalid request Body');
  var data = (0, _loan.changeLoanStatus)({
    loan: loan,
    status: status
  });
  if (!data) throw new _error.NotFoundError('loan with that id not found');
  var response = new _response["default"](data, 200);
  res.status(response.status).json(response);
};

exports.loanStatus = loanStatus;