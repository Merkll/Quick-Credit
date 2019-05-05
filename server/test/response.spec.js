/* eslint-disable no-unused-expressions */
const chai = require('chai');

const { expect } = chai;
const Response = require('../src/lib/response');

describe('Http Response', () => {
  it('Should return status and supplied data', async () => {
    const { status } = new Response({ data: 'data' });
    expect(status).to.be.eqls(200);
  });
});
