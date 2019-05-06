/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import ErrorHandler from '../../src/middleware/error-handler';

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
        res.data = data;
      },
    };
    next = () => {};
  });
  it('Status should be 500', async () => {
    ErrorHandler(new Error(), req, res, next);
    expect(res.code).to.be.eqls(500);
  });
});
