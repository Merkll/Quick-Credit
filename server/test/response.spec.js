/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Response from '../src/lib/response';

describe('Http Response', () => {
  it('Should return status and supplied data', async () => {
    const { status } = new Response({ data: 'data' });
    expect(status).to.be.eqls(200);
  });
});
