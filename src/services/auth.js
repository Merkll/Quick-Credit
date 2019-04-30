const { User } = require('../model');

exports.Signin = ({ email, password }) => {
  if (!email || !password) throw new Error('Email and Password required for autjentication');
  const authData = User.find({ email, password }).data[0];
  if (!authData) return { code: 205, message: 'Invalid Email or Password' };
  return authData;
};
