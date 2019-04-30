const uuid = require('uuid/v4');
const { User, Auth } = require('../model');

const Signin = ({ email, password }) => {
  if (!email || !password) throw new Error('Email and Password required for autjentication');
  const authData = User.find({ email, password }).data[0];
  if (!authData) return { code: 205, message: 'Invalid Email or Password' };
  const token = uuid();
  const user = authData.id;
  Auth.insert({ id: email, token, user });
  return { token, ...authData };
};

const Signup = (userDetails) => {
  if (!userDetails) throw new Error('User Details is required');
  const { email, password } = userDetails;
  const userExist = !!(User.find({ email }).data[0]);
  if (userExist) return { code: 201, message: 'User exists' };
  User.insert(userDetails);
  return Signin({ email, password });
};

exports.validateToken = (token) => {
  const data = Auth.find({ token }).data[0];
  if (!data) return { code: 217, message: 'Cannot retrieve a user for the specified token.' };
  return data;
};

exports.Signin = Signin;
exports.Signup = Signup;
