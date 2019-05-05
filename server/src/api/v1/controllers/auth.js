
const {
  InvalidRequestBodyError,
  UserExists,
  AuthenticationError,
} = require('../../../lib/error');
const { Signup, Signin } = require('../../../services/auth');
const Response = require('../../../lib/response');

exports.signup = (req, res) => {
  const requestBody = req.body;
  if (!requestBody || Object.keys(requestBody).length == 0) {
    throw new InvalidRequestBodyError('Post Body required');
  }
  const data = Signup(requestBody);
  if (data.code == 201) throw new UserExists();
  const response = new Response(data, 201);
  res.status(201).send(response);
};

exports.signin = (req, res) => {
  const requestBody = req.body;
  if (!requestBody || Object.keys(requestBody).length == 0) {
    throw new InvalidRequestBodyError('Post Body required');
  }
  const data = Signin(requestBody);
  if (data.code == 205) throw new AuthenticationError('Invalid login credentials');
  const response = new Response(data, 200);
  res.status(200).send(response);
};
