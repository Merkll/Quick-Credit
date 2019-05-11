import { InvalidRequestBodyError, NotFoundError } from './error';

// eslint-disable-next-line import/prefer-default-export
export const checkRequestBody = (requestBody) => {
  if (!requestBody || Object.keys(requestBody).length === 0) {
    throw new InvalidRequestBodyError('Post Body required');
  }
  return requestBody;
};

export const checkUserData = (userData) => {
  if (!userData) throw new NotFoundError('User with that email address doesnt exist');
  return userData;
};

export const checkLoanData = (loanData) => {
  if (!loanData) throw new NotFoundError('loan with that id not found');
  return loanData;
};
