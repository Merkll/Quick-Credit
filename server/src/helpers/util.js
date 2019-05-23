/* eslint-disable func-names */
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

export const formatDate = (date) => {
  if (!date) return date;
  // eslint-disable-next-line no-extend-native
  Date.prototype.friendlyFormat = function () {
    const mm = this.getMonth() + 1; // getMonth() is zero-based
    const dd = this.getDate();
    return [this.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');
  };
  return new Date(date).friendlyFormat();
};

export const formatDataDate = (data) => {
  let userData = data;
  if (!Array.isArray(data)) userData = [data];
  const filteredData = userData.map(singleData => Object.keys(singleData).reduce((object, key) => {
    // eslint-disable-next-line no-param-reassign
    object[key] = singleData[key];
    // eslint-disable-next-line no-param-reassign
    if (key === 'createdon' || key === 'updatedon') object[key] = formatDate(singleData[key]);
    return object;
  }, {}));
  return (filteredData.length === 1 && !Array.isArray(data)) ? filteredData[0] : filteredData;
};
