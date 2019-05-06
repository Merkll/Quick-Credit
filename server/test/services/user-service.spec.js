/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import faker from 'faker';
import { verify, getUser, getAllUsers, getUnverifiedUsers, getVerifiedUsers } from '../../src/services/user';
import { User } from '../../src/model';

describe('User Service', () => {
  context('verify', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    before(() => {
      User.insert({ email, password });
    });
    it('Should throw error if email is undefined', () => {
      expect(() => verify()).to.throw();
    });
    it('Should return object when provided mail', () => {
      const data = verify(email);
      expect(data).to.be.an.instanceof(Object);
      expect(data.email).to.be.eql(email);
    });
  });

  context('getUser', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    before(() => {
      User.insert({ email, password });
    });
    it('Should throw error if email is undefined', () => {
      expect(() => getUser()).to.throw();
    });
    it('Should return object when provided mail', () => {
      const data = getUser(email);
      expect(data).to.be.an.instanceof(Object);
      expect(data.email).to.be.eql(email);
    });
  });

  context('getAllUsers', () => {
    before(() => {
      const UserData = Array(10).fill(0).map((data, index) => ({
        id: index + 1,
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'unverified',
        isAdmin: faker.random.boolean(),
      }
      ));
      User.insert(UserData);
    });
    it('Should return an array of object', () => {
      const data = getAllUsers();
      expect(data).to.be.an.instanceof(Array);
    });
  });
  context('getAllUsers', () => {
    before(() => {
      const UserData = Array(10).fill(0).map((data, index) => ({
        id: index + 1,
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'unverified',
        isAdmin: faker.random.boolean(),
      }
      ));
      User.insert(UserData);
    });
    it('Should return an array of object', () => {
      const data = getUnverifiedUsers();
      expect(data).to.be.an.instanceof(Array);
    });
  });

  context('getVerifiedUsers', () => {
    before(() => {
      const UserData = Array(10).fill(0).map((data, index) => ({
        id: index + 1,
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'verified',
        isAdmin: faker.random.boolean(),
      }
      ));
      User.insert(UserData);
    });
    it('Should return an array of object', () => {
      const data = getVerifiedUsers();
      expect(data).to.be.an.instanceof(Array);
    });
  });
});
