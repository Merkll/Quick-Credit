/* eslint-disable import/named */
/**
 * Business login for all authentication based actions
 */
import { User } from '../model';
import { generateToken, verifyToken, validateHash } from '../helpers/auth';

const tokenSecret = process.env.SECRET || 'quickcredite435rt';

export const Signin = ({ email, password }) => {
  const authData = User.find({ email }).data[0];
  if (!authData) return { error: 'User Email doesnt exist' };

  const isValid = validateHash(password, authData.password);
  if (!isValid) return { error: 'Password and email doesnt match' };

  const { id, isAdmin } = authData;
  const token = generateToken({ id, isAdmin, email });
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
  const { id } = verifyToken(token, tokenSecret);
  if (!id) return { error: 'token could not be verified.' };
  const data = User.find({ id }).data[0];
  if (!data) return { error: 'Cannot retrieve a user for the specified token.' };
  return { token, ...data };
};
