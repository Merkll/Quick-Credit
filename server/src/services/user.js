// eslint-disable-next-line import/named
import { User } from '../model';

export const verify = async (email) => {
  if (!email) throw new Error('Email is undefined');
  const { data } = await User.update({ status: 'verified' }, { email: { eq: email } });
  return data[0];
};

export const getUser = async (email) => {
  if (!email) throw new Error('Email is undefined');
  const { data } = await User.find({ email: { eq: email } });
  return data[0];
};

export const filterUsers = async (status) => {
  const { data } = await User.find({ status: { eq: status } });
  return data;
};
export const getAllUsers = async () => {
  const { data } = await User.findAll();
  return data;
};
export const getVerifiedUsers = async () => filterUsers('verified');
export const getUnverifiedUsers = async () => filterUsers('unverified');
export const isUserVerified = async (email) => {
  const { status } = await getUser(email);
  return status === 'verified';
};
