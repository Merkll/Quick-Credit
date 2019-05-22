import { InvalidRequestBodyError } from './error';

// eslint-disable-next-line import/prefer-default-export
export const checkRequestBody = (requestBody, next) => {
  if (!requestBody || Object.keys(requestBody).length === 0) {
    return next(InvalidRequestBodyError('Post Body required'));
  }
  return requestBody;
};

export const filterPassword = (data) => {
  let userData = data;
  if (!Array.isArray(data)) userData = [data];
  const filteredData = userData.map(singleData => Object.keys(singleData).reduce((object, key) => {
    // eslint-disable-next-line no-param-reassign
    if (key !== 'password') object[key] = singleData[key];
    return object;
  }, {}));
  return (filteredData.length === 1 && !Array.isArray(data)) ? filteredData[0] : filteredData;
};

export const formatAmount = amount => amount.toFixed(2);
