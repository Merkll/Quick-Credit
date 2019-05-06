const { User } = require('../model');

exports.verify = (email) => {
  if (!email) throw new Error('Email is undefined');
  return User.update({ status: 'verified' }, { email }).data[0];
};

exports.getUser = (email) => {
  if (!email) throw new Error('Email is undefined');
  return User.find({ email }).data[0];
};
exports.filterUsers = ({ status }) => User.find({ status }).data;
exports.getAllUsers = () => User.findAll().data;
exports.getVerifiedUsers = () => User.find({ status: 'verified' }).data;
exports.getUnverifiedUsers = () => User.find({ status: 'unverified' }).data;
