
const { InvalidRequestBodyError } = require('../../../lib/error');
const { Signup } = require('../../../services/auth');
const Response = require('../../../lib/response');

exports.signup = (req, res) => {
  const requestBody = req.body;
  if (!requestBody || Object.keys(requestBody).length == 0) {
    throw new InvalidRequestBodyError('Post Body required');
  }
  const data = Signup(requestBody);
  console.log(data);
  const response = new Response(data, 201);
  res.status(201).send(response);
};
