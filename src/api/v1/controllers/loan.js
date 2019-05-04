const {
  NotFoundError,
} = require('../../../lib/error');
const {
  getLoan,
  getAllLoans,
  getCurrentLoans,
  getRepaidLoans,
} = require('../../../services/loan');
const Response = require('../../../lib/response');

exports.getLoan = (req, res) => {
  const { loan } = req.params;
  const data = getLoan(loan);
  if (!data) throw new NotFoundError('loan with that id not found');
  const response = new Response(data);
  res.status(response.status).send(response);
};

exports.getAllLoans = (req, res) => {
  const { status, repaid } = req.query;
  let data;
  if (status == 'approved' && repaid === 'false') data = getCurrentLoans();
  else if (status == 'approved' && repaid === 'true') data = getRepaidLoans();
  else data = getAllLoans();
  const response = new Response(data);
  res.status(response.status).send(response);
};
