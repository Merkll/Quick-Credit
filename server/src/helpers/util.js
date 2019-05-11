import { InvalidRequestBodyError } from './error';

// eslint-disable-next-line import/prefer-default-export
export const checkRequestBody = (requestBody) => {
  if (!requestBody || Object.keys(requestBody).length === 0) {
    throw new InvalidRequestBodyError('Post Body required');
  }
  return requestBody;
};
