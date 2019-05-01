/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const faker = require('faker');
const { Signin, Signup, validateToken } = require('../src/services/auth');
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

  context('Signup', () => {
    const userData = {
      email: faker.internet.email(),
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      password: faker.random.uuid(),
      address: faker.address.streetAddress(),
      status: 'unverified',
      isAdmin: faker.random.boolean(),
    };

    it('Should throw error if email and password is undefined', () => {
      expect(() => Signup()).to.throw();
    });
    it('Should return object if userDetails is defined', () => {
      const data = Signup(userData);
      expect(data).to.be.an.instanceof(Object);
    });
    it('Should return an error Object if user email exist', () => {
      const data = Signup(userData);
      expect(data).to.be.an.instanceof(Object);
      expect(data.code).to.be.eql(201);
    });
  });

  context('validateToken', () => {
    let userToken;
    before(() => {
      const userData = {
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'unverified',
        isAdmin: faker.random.boolean(),
      };
      const { token } = Signup(userData);
      userToken = token;
    });

    it('Should return an error Object if token is invalid', () => {
      const data = validateToken(faker.random.uuid());
      expect(data).to.be.an.instanceof(Object);
      expect(data.code).to.be.eql(217);
    });

    it('Should return token data if token is valid', () => {
      const data = validateToken(userToken);
      expect(data).to.be.an.instanceof(Object);
      expect(data.token).to.be.eql(userToken);
    });
  });
});
