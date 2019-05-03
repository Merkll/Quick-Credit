const {
  NotFoundError,
} = require('../../../lib/error');
const { getLoan } = require('../../../services/loan');
const Response = require('../../../lib/response');

exports.getLoan = (req, res) => {
  const { loan } = req.params;
  const data = getLoan(loan);
  if (!data) throw new NotFoundError('loan with that id not found');
  const response = new Response(data);
  res.status(response.status).send(response);
};
