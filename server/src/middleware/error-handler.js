import { MethodNotAllowedError } from '../helpers/error';

// eslint-disable-next-line no-unused-vars
export const ErrorHandler = (err, req, res, next) => {
  if (err.status) res.status(err.status).send(err);
  else res.status(500).send(err);
};

export const MethodNotAllowed = (req, res, next) => {
  const error = new MethodNotAllowedError();
  next(error);
};
