import { InvalidRequestBodyError } from './error';

// eslint-disable-next-line import/prefer-default-export
export const checkRequestBody = (requestBody, next) => {
  if (!requestBody || Object.keys(requestBody).length === 0) {
    return next(InvalidRequestBodyError('Post Body required'));
  }
  return requestBody;
};

export const filterPassword = userData => Object.keys(userData).reduce((object, key) => {
  // eslint-disable-next-line no-param-reassign
  if (key !== 'password') object[key] = userData[key];
  return object;
}, {});
