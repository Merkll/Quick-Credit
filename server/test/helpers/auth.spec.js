/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import * as Auth from '../../src/helpers/auth';

describe('AuthHelper', () => {
  context('TokenGeneration', () => {
    it('should return auth token', () => {
      const token = Auth.generateToken({ id: 2, name: 'john' });
      expect(token).to.not.be.undefined;
    });
  });
  context('TokenVerification', () => {
    it('should return auth token', () => {
      const token = Auth.generateToken({ id: 2, name: 'john' });
      const { id } = Auth.verifyToken(token);
      expect(id).to.be.eql(2);
    });
  });    
  context('Pssword hash', () => {
    it('should return hased password', () => {
      const hash = Auth.hashPassword('testPassword');
      expect(hash).to.not.be.undefined;
    });
  });
  context('hashCompare', () => {
    it('should return true', () => {
      const hash = Auth.hashPassword('testPassword');
      const compare = Auth.validateHash('testPassword', hash);
      expect(compare).to.be.true;
    });
  });
});
