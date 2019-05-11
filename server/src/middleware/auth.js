/* eslint-disable import/prefer-default-export */
import { verifyToken, isRouteSecure, isUserAuthorized } from '../helpers/auth';
import { TokenNotProvidedError, InvalidToken, AuthorizationError } from '../helpers/error';

const getAccessToken = (req) => {
  let { token } = req.body || {};
  if (!token && req.headers) {
    token = req.headers['x-access-token'] || req.headers.authorization || '';
    if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
  }
  return token;
};

export const Authenticate = (req, res, next) => {
  if (!isRouteSecure(req)) return next();
  const token = getAccessToken(req);
  if (!token) return next(new TokenNotProvidedError());
  const decoded = verifyToken(token);
  if (!decoded) return next(new InvalidToken());
  req.user = decoded;
  return next();
};
export const Authorize = (req, res, next) => {
  if (isUserAuthorized(req.user)) return next();
  return next(new AuthorizationError());
};
