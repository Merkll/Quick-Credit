import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { nonSecureRoutes } from '../routes/config';

const tokenSecret = process.env.SECRET || 'quickcredite435rt';

export const generateToken = (details, exp = '12h') => jwt.sign({ ...details }, tokenSecret, { expiresIn: exp });
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, tokenSecret); 
  } catch (error) {
    return false;
  }
};
export const hashPassword = password => bcrypt.hashSync(password, 10);
export const validateHash = (password, hash) => bcrypt.compareSync(password, hash);
export const isRouteSecure = req => !nonSecureRoutes.find(route => !!req.path.match(new RegExp(route, 'gi')));
export const isUserAuthorized = (user) => {
  const { isAdmin } = user;
  return !!isAdmin;
};
