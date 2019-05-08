/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Mock from '../src/lib/mock';

describe('Data mock', () => {
  const initialEnv = process.env.NODE_ENV;
  before(() => {
    process.env.NODE_ENV = 'dev';
  });
  after(() => {
    process.env.NODE_ENV = initialEnv;
  });
  it('should return true', async () => {
    const mock = Mock();
    expect(mock).to.be.true;
  });
});
