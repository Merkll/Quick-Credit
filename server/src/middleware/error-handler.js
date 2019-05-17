import { MethodNotAllowedError } from '../helpers/error';

export const ErrorHandler = (err, req, res, next) => {
  if (err.status) res.status(err.status).send(err);
  else res.status(500).send(err);
  // next(err);
};

export const MethodNotAllowed = (req, res, next) => {
  const error = new MethodNotAllowedError();
  next(error);
};
