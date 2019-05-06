
const {
  NotFoundError,
} = require('../../../lib/error');
const { 
  verify, 
  getAllUsers, filterUsers, getUser, 
} = require('../../../services/user');
const Response = require('../../../lib/response');

exports.verify = (req, res) => {
  const { email } = req.params;
  const data = verify(email);
  if (!data) throw new NotFoundError('User with that email address doesnt exist');
  const response = new Response(data);
  res.status(response.status).json(response);
};

exports.getUsers = (req, res) => {
  const statusEnums = ['verified', 'unverified'];
  const { status } = req.query;
  let data;
  if (statusEnums.includes(status)) data = filterUsers({ status });
  else data = getAllUsers();
  const response = new Response(data);
  res.status(response.status).json(response);
};

exports.getUser = (req, res) => {
  const { email } = req.params;
  const data = getUser(email);
  if (!data) throw new NotFoundError('User with that email address doesnt exist');
  const response = new Response(data);
  res.status(response.status).json(response);
};
