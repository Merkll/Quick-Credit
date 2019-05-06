/* eslint-disable import/named */
/**
 * Business login for all authentication based actions
 */
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { User } from '../model';

const tokenSecret = process.env.SECRET || 'quickcredite435rt';

export const Signin = ({ email, password }) => {
  if (!email || !password) throw new Error('Email and Password required for autjentication');

  const authData = User.find({ email }).data[0];
  if (!authData) return { error: 'User Email doesnt exist' };

  const isValid = bcrypt.compareSync(password, authData.password);
  if (!isValid) return { error: 'Password and email doesnt match' };

  const { id, isAdmin } = authData;
  const token = jwt.sign({ id, isAdmin, email }, tokenSecret);
  return { token, ...authData };
};

export const Signup = (userDetails) => {
  if (!userDetails) throw new Error('User Details is required');

  const { email, password } = userDetails;
  const userExist = !!(User.find({ email }).data[0]);

  if (userExist) return { error: 'User With that email already exists' };
  if (!User.validateSchema(userDetails)) return { error: 'Invalid User Details' };

  User.insert(userDetails);
  return Signin({ email, password });
};

export const validateToken = (token) => {
  try {
    const { id } = jwt.verify(token, tokenSecret);

    const data = User.find({ id }).data[0];
    if (!data) return { error: 'Cannot retrieve a user for the specified token.' };

    return { token, ...data };
  } catch (error) {
    return { error: 'Invalid Access token' };
  }
};
