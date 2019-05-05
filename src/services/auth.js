const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../model');

const tokenSecret = process.env.SECRET || 'quickcredite435rt';

const Signin = ({ email, password }, secret = tokenSecret) => {
  if (!email || !password) throw new Error('Email and Password required for autjentication');
  const authData = User.find({ email }).data[0];
  if (!authData) return { code: 205, message: 'User Email doesnt exist' };
  const isValid = bcrypt.compareSync(password, authData.password);
  if (!isValid) return { code: 205, message: 'Password and email doesnt match' };
  const user = authData.id;
  const token = jwt.sign({ id: user }, secret);
  return { token, ...authData };
};

const Signup = (userDetails) => {
  if (!userDetails) throw new Error('User Details is required');
  if (!User.validateSchema(userDetails)) return { error: 'Invalid Loan Details' };
  const { email, password } = userDetails;
  const userExist = !!(User.find({ email }).data[0]);
  if (userExist) return { code: 201, message: 'User exists' };
  User.insert(userDetails);
  return Signin({ email, password });
};

exports.validateToken = (token, secret = tokenSecret) => {
  try {
    const { id } = jwt.verify(token, secret);
    const data = User.find({ id }).data[0];
    if (!data) return { code: 217, message: 'Cannot retrieve a user for the specified token.' };
    return { token, ...data };
  } catch (error) {
    return { code: 403, message: 'Invalid Access token' };
  }
};

exports.Signin = Signin;
exports.Signup = Signup;
