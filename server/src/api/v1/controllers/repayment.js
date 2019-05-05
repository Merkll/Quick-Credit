const {
  NotFoundError,
} = require('../../../lib/error');
const {
  getLoanRepayments,
  createRepayment,
} = require('../../../services/repayment');

const {
  getLoan,
} = require('../../../services/loan');

const Response = require('../../../lib/response');

exports.getLoanRepayments = (req, res) => {
  const { loan } = req.params;
  const data = getLoanRepayments(loan);
  if (data.length === 0) throw new NotFoundError('No repayment for that loan found');
  const response = new Response(data);
  res.status(response.status).send(response);
};

exports.postLoanRepayment = (req, res) => {
  const { loan } = req.params;
  const loanDetails = getLoan(loan);
  if (!loanDetails) throw new NotFoundError('loan with that id not found');
  const data = createRepayment(loan);
  const response = new Response(data);
  res.status(response.status).send(response);
};
