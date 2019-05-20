/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Seed from '../src/db/seed';

describe('Data Seed', () => {
  const initialEnv = process.env.NODE_ENV;
  before(() => {
    process.env.NODE_ENV = 'dev';
  });
  after(() => {
    process.env.NODE_ENV = initialEnv;
  });
  it('should return true', async () => {
    const seed = await Seed();
    expect(seed).to.be.true;
  });
});
