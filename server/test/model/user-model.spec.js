/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const faker = require('faker');
const { User } = require('../../src/model');

let UserData;
describe('User Model', () => {
  before(() => {
    UserData = Array(10).fill(0).map((data, index) => ({
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


  context('Model Initialization', () => {
    it('Should return UserData', () => {
      const { data } = User.findAll();
      expect(data).to.be.eql(UserData);
    });
  });
  context('user update', () => {
    it('Should return UserData', () => {
      const { id } = UserData[4];
      const data = User.update({
        address: faker.address.streetAddress(),
      }, { id }).data[0];
      expect(data.id).to.be.eql(id);
    });
    it('Should update password', () => {
      const { id } = UserData[4];
      const data = User.update({
        password: 'newpassword',
      }, { id }).data[0];
      expect(data.id).to.be.eql(id);
    });
  });
});
