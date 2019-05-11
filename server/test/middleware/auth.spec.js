/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { Authenticate, Authorize } from '../../src/middleware/auth';
import { generateToken } from '../../src/helpers/auth';

describe('AuthMiddleware', () => {
  const data = {};
  const params = [
    {},
    (err) => { data.err = err; },
  ];
  context('SecureAndNonsecureroutes', () => {
    it('Status not throw error for non secured routes', async () => {
      Authenticate({ path: '/docs' }, ...params);
      expect(data.err).to.be.undefined;
    });
    it('Status throw error for secure routes', async () => {
      Authenticate({ path: '/loans' }, ...params);
      expect(data.err).to.not.be.undefined;
    });
  });
  context('Token validaiton', () => {
    const token = generateToken({ id: 3, isAdmin: true });

    it('Status not throw error on valid token in body', async () => {
      Authenticate({ path: '/loans', body: { token } }, ...params);
      expect(data.err).to.be.undefined;
    });
    it('Status not throw error on valid token in header', async () => {
      const headers = { authorization: token };
      Authenticate({ path: '/loans', headers }, ...params);
      expect(data.err).to.be.undefined;
    });
    it('Status not throw error on valid token in header bearer', async () => {
      const headers = { authorization: `Bearer ${token}` };
      Authenticate({ path: '/loans', headers }, ...params);
      expect(data.err).to.be.undefined;
    });
    it('Status throw error if token is not provided in header', async () => {
      const headers = { authorization: null };
      Authenticate({ path: '/loans', headers }, ...params);
      expect(data.err).to.not.be.undefined;
    });
    it('Status throw error on invalid token', async () => {
      Authenticate({ path: '/loans', body: { token: 'token' } }, ...params);
      expect(data.err).to.be.not.undefined;
    });
  });
  context('Check Authorization', () => {
    const unAuthorizeUser = { id: 3, isAdmin: false };
    const authorizedUser = { id: 3, isAdmin: true };
    it('Should throw error on unauthorized user', async () => {
      Authorize({ user: unAuthorizeUser }, ...params);
      expect(data.err).to.not.be.undefined;
    });
    it('Status not throw error on authorized', async () => {
      Authorize({ user: authorizedUser }, ...params);
      expect(data.err).to.be.undefined;
    });
  });
});
