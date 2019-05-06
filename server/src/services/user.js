import { User } from '../model';

export const verify = (email) => {
  if (!email) throw new Error('Email is undefined');
  return User.update({ status: 'verified' }, { email }).data[0];
};

export const getUser = (email) => {
  if (!email) throw new Error('Email is undefined');
  return User.find({ email }).data[0];
};

export const filterUsers = ({ status }) => User.find({ status }).data;
export const getAllUsers = () => User.findAll().data;
export const getVerifiedUsers = () => User.find({ status: 'verified' }).data;
export const getUnverifiedUsers = () => User.find({ status: 'unverified' }).data;
