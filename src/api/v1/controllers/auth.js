
const { InvalidRequestBodyError } = require('../../../lib/error');
const { Signup } = require('../../../services/auth');

exports.signup = (req, res) => {
  const requestBody = req.body;
  if (!requestBody || Object.keys(requestBody).length == 0) {
    throw new InvalidRequestBodyError('Post Body required');
  }
  const data = Signup(requestBody);
  res.status(201).send(data);
};
