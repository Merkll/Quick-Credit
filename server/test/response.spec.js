/* eslint-disable no-unused-expressions */
import chai from 'chai';

const { expect } = chai;
import Response from '../src/lib/response';

describe('Http Response', () => {
  it('Should return status and supplied data', async () => {
    const { status } = new Response({ data: 'data' });
    expect(status).to.be.eqls(200);
  });
});
