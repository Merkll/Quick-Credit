/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { 
  MethodNotAllowedError, 
  ResourceNotFoundError, NotFoundError, 
  UserExists, AuthenticationError, AuthorizationError, InvalidRequestBodyError,
  TokenNotProvidedError, InvalidToken, ExpiredToken
} from '../../src/helpers/error';


describe('Http Errors', () => {
  context('method not allowed', () => {
    it('Should status and supplied message', async () => {
      const { error, status } = new MethodNotAllowedError('Not allowed');
      expect(status).to.be.eqls(405);
      expect(error).to.be.eql('Not allowed');
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new MethodNotAllowedError();
      expect(status).to.be.eqls(405);
      expect(error).to.not.be.undefined;
    });
  });

  context('AuthorizationError', () => {
    const statusCode = 403;
    it('Should status and supplied message', async () => {
      const message = 'Not authorized';
      const { error, status } = new AuthorizationError(message);
      expect(status).to.be.eqls(statusCode);
      expect(error).to.be.eql(message);
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new AuthorizationError();
      expect(status).to.be.eqls(statusCode);
      expect(error).to.not.be.undefined;
    });
  });

  context('AuthenticationError', () => {
    const statusCode = 401;
    it('Should return status and supplied message', async () => {
      const message = 'Not authenticated';
      const { error, status } = new AuthenticationError(message);
      expect(status).to.be.eqls(statusCode);
      expect(error).to.be.eql(message);
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new AuthenticationError();
      expect(status).to.be.eqls(statusCode);
      expect(error).to.not.be.undefined;
    });
  });

  context('UserExists', () => {
    const statusCode = 400;
    it('Should return status and supplied message', async () => {
      const message = 'User exist';
      const { error, status } = new UserExists(message);
      expect(status).to.be.eqls(statusCode);
      expect(error).to.be.eql(message);
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new UserExists();
      expect(status).to.be.eqls(statusCode);
      expect(error).to.not.be.undefined;
    });
  });

  context('NotFound', () => {
    const statusCode = 404;
    it('Should return status and supplied message', async () => {
      const message = 'Not found';
      const { error, status } = new NotFoundError(message);
      expect(status).to.be.eqls(statusCode);
      expect(error).to.be.eql(message);
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new NotFoundError();
      expect(status).to.be.eqls(statusCode);
      expect(error).to.not.be.undefined;
    });
  });

  context('ResourceNotFoundError', () => {
    const statusCode = 404;
    it('Should return status and supplied message', async () => {
      const message = 'Resource Not found';
      const { error, status } = new ResourceNotFoundError(message);
      expect(status).to.be.eqls(statusCode);
      expect(error).to.be.eql(message);
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new ResourceNotFoundError();
      expect(status).to.be.eqls(statusCode);
      expect(error).to.not.be.undefined;
    });
  });

  context('InvalidRequestBodyError', () => {
    const statusCode = 422;
    it('Should return status and supplied message', async () => {
      const message = 'Resource Not found';
      const { error, status } = new InvalidRequestBodyError(message);
      expect(status).to.be.eqls(statusCode);
      expect(error).to.be.eql(message);
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new InvalidRequestBodyError();
      expect(status).to.be.eqls(statusCode);
      expect(error).to.not.be.undefined;
    });
  });
  context('MissingToken', () => {
    const statusCode = 400;
    it('Should return status and supplied message', async () => {
      const message = 'Token missing';
      const { error, status } = new TokenNotProvidedError(message);
      expect(status).to.be.eqls(statusCode);
      expect(error).to.be.eql(message);
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new TokenNotProvidedError();
      expect(status).to.be.eqls(statusCode);
      expect(error).to.not.be.undefined;
    });
  });
  context('InvalidToken', () => {
    const statusCode = 403;
    it('Should return status and supplied message', async () => {
      const message = 'Token missing';
      const { error, status } = new InvalidToken(message);
      expect(status).to.be.eqls(statusCode);
      expect(error).to.be.eql(message);
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new InvalidToken();
      expect(status).to.be.eqls(statusCode);
      expect(error).to.not.be.undefined;
    });
  });
  context('ExpiredToken', () => {
    const statusCode = 403;
    it('Should return status and supplied message', async () => {
      const message = 'Token missing';
      const { error, status } = new ExpiredToken(message);
      expect(status).to.be.eqls(statusCode);
      expect(error).to.be.eql(message);
    });
    it('Should return status and default mesage', async () => {
      const { error, status } = new ExpiredToken();
      expect(status).to.be.eqls(statusCode);
      expect(error).to.not.be.undefined;
    });
  });
});
