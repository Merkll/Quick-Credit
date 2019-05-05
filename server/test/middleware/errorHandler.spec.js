/* eslint-disable no-unused-expressions */
const chai = require('chai');

const { expect } = chai;
const ErrorHandler = require('../../src/middleware/error-handler');

describe('ErrorHandler', () => {
  let req;
  let res;
  let next;
  before(() => {
    req = {};
    res = {
      status: (status) => {
        res.code = status;
        return res;
      },
      send: (data) => {
        this.data = data;
      },
    };
    next = () => {};
  });
  it('Status should be 500', async () => {
    ErrorHandler(new Error(), req, res, next);
    expect(res.code).to.be.eqls(500);
  });
});
