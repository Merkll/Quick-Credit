const {
  NotFoundError,
} = require('../../../lib/error');
const {
  getLoanRepayments,
} = require('../../../services/repayment');
const Response = require('../../../lib/response');

exports.getLoanRepayments = (req, res) => {
  const { loan } = req.params;
  const data = getLoanRepayments(loan);
  if (data.length === 0) throw new NotFoundError('No repayment for that loan found');
  const response = new Response(data);
  res.status(response.status).send(response);
};
