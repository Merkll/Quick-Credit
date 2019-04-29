/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const faker = require('faker');
const User = require('../src/model/user');

describe('User Model', () => {
  before(() => {
    const UserData = Array(10).fill(0).map(() => ({
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


  context('Model Initialization', () => {
    it('Should create a MemDB collection', () => {
      console.log(User.findAll().data);
    });
  });
});
