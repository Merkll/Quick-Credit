/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const faker = require('faker');
const { Signin } = require('../src/services/auth');
const { User } = require('../src/model');

describe('Auth Service', () => {
  context('Signin', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    before(() => {
      User.insert({ email, password });
    });
    it('Should throw error if email and password is undefined', () => {
      expect(() => Signin()).to.throw();
    });

    it('Should throw error if password is undefined', () => {
      expect(() => Signin({ email: 'email' })).to.throw();
    });
    it('Should return an error Object if user doesnt exist', () => {
      const data = Signin({ email: 'email', password });
      expect(data).to.be.an.instanceof(Object);
      expect(data.code).to.be.eql(205);
    });
    it('Should return an Object of user data if user exist', () => {
      const data = Signin({ email, password });
      expect(data).to.be.an.instanceof(Object);
      expect(data.email).to.be.eql(email);
    });
    it('Should return an auth token on authentication', () => {
      const data = Signin({ email, password });
      expect(data.token).to.not.be.undefined;
    });
  });
});
