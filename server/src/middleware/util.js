import { InvalidRequestBodyError } from '../helpers/error';

// eslint-disable-next-line import/prefer-default-export
export const CheckRequestBody = (req, res, next) => {
  const { body } = req;
  if (!body || Object.keys(body).length === 0) {
    return next(new InvalidRequestBodyError('Post Body required'));
  }
  return next();
};
