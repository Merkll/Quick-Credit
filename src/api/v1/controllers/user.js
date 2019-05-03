
const {
  NotFoundError,
} = require('../../../lib/error');
const { verify } = require('../../../services/user');
const Response = require('../../../lib/response');

exports.verify = (req, res) => {
  const { email } = req.params;
  const data = verify(email);
  if (!data) throw new NotFoundError('User with that email address doesnt exist');
  const response = new Response(data);
  res.status(response.status).send(response);
};
