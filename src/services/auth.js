const uuid = require('uuid/v4');
const { User, Auth } = require('../model');

exports.Signin = ({ email, password }) => {
  if (!email || !password) throw new Error('Email and Password required for autjentication');
  const authData = User.find({ email, password }).data[0];
  if (!authData) return { code: 205, message: 'Invalid Email or Password' };
  const token = uuid();
  const user = authData.id;
  Auth.insert({ id: email, token, user });
  return { token, ...authData };
};
