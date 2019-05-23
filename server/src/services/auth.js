/* eslint-disable import/named */
/**
 * Business login for all authentication based actions
 */
import GeneratePassword from 'password-generator';
import { User, Auth } from '../model';
import { filterPassword } from '../helpers/util';

import { 
  generateToken, verifyToken, validateHash, hashPassword
} from '../helpers/auth';
import { MailEvent } from '../lib/mail';

const tokenSecret = process.env.SECRET || 'quickcredite435rt';

export const Signin = async ({ email, password }) => {
  const { data } = await User.find({ email: { eq: email } }, false, { auth: true });
  const authData = data[0];
  if (!authData) return { error: 'User Email doesnt exist' };

  const isValid = validateHash(password, authData.password);
  if (!isValid) return { error: 'Password and email doesnt match' };
  const { id, isadmin } = authData;
  const token = generateToken({ id, isAdmin: isadmin, email });
  return { token, ...filterPassword(authData) };
};

export const Signup = async (userDetails) => {
  if (!userDetails) throw new Error('User Details is required');

  const { email, password } = userDetails;
  const { data } = await User.find({ email: { eq: email } });
  const userExist = !!(data[0]);

  if (userExist) return { error: 'User With that email already exists' };
  const { valid, errors } = User.validateSchema(userDetails);
  if (!valid) return { error: errors };

  await User.insert(userDetails);
  return Signin({ email, password });
};

export const validateToken = async (token) => {
  const { id } = verifyToken(token, tokenSecret);
  if (!id) return { error: 'token could not be verified.' };
  const { data } = await User.find({ id: { eq: id } });
  if (!data[0]) return { error: 'Cannot retrieve a user for the specified token.' };
  return { token, ...data[0] };
};

export const passwordReset = async (email) => {
  const token = GeneratePassword();
  await MailEvent('password-reset', {
    to: email,
    token,
    'client-email': email
  });
  const authData = {
    token,
    email,
  };
  await Auth.insert(authData);
  return token;
};

export const changePassword = async (email, token, newPassword) => {
  const { data } = await Auth.find({ email: { eq: email } });
  if (!data[0]) return { error: 'Could not verify user' };
  const storedToken = data[0].token;
  // add token expiration logic
  if (storedToken !== token) return { error: 'Token do not match' };
  const password = hashPassword(newPassword);
  await User.update({ password }, { email: { eq: email } });
  await Auth.delete({ email: { eq: email } }); 
  return Signin({ email, password });
};
