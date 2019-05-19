/* eslint-disable import/named */
/**
 * Business login for all authentication based actions
 */
import { User } from '../model';
import { generateToken, verifyToken, validateHash } from '../helpers/auth';

const tokenSecret = process.env.SECRET || 'quickcredite435rt';

export const Signin = async ({ email, password }) => {
  const { data } = await User.find({ email: { eq: email } });
  const authData = data[0];
  if (!authData) return { error: 'User Email doesnt exist' };

  const isValid = validateHash(password, authData.password);
  if (!isValid) return { error: 'Password and email doesnt match' };

  const { id, isAdmin } = authData;
  const token = generateToken({ id, isAdmin, email });
  return { token, ...authData };
};

export const Signup = async (userDetails) => {
  if (!userDetails) throw new Error('User Details is required');

  const { email, password } = userDetails;
  const { data } = await User.find({ email: { eq: email } });
  const userExist = !!(data[0]);

  if (userExist) return { error: 'User With that email already exists' };
  if (!User.validateSchema(userDetails)) return { error: 'Invalid User Details' };

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
