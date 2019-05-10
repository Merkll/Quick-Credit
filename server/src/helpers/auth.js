import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { nonSecureRoutes } from '../routes/config';

const tokenSecret = process.env.SECRET || 'quickcredite435rt';

export const generateToken = details => jwt.sign({ ...details }, tokenSecret);
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
