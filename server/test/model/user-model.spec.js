/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import faker from 'faker';
import { User } from '../../src/model';

let UserData;
let insertedData;


describe('User Model', () => {
  before(async () => {
    UserData = Array(10).fill(0).map(() => ({
      email: faker.internet.email(),
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      password: faker.random.uuid(),
      address: faker.address.streetAddress(),
      status: 'unverified',
      isAdmin: faker.random.boolean(),
    }
    ));
    await User.initialise();
    await User.deleteAll();
    const { data } = await User.insert(UserData);
    insertedData = data;
  });
  after(async () => {
    await User.deleteAll();
  });
  describe('Model Initialization', () => {
    it('Should return UserData', async () => {
      const { data } = await User.findAll();
      expect(...data).to.have.property('email');
    });
  });
  describe('user update', () => {
    it('Should return UserData', async () => {
      const userId = insertedData[0].id;
      const { data } = await User.update({
        address: faker.address.streetAddress(),
      }, { id: { eq: userId } });
      expect(data[0].id).to.be.eql(userId);
    });
    it('Should update password', async () => {
      const userId = insertedData[0].id;
      const { data } = await User.update({
        password: 'newpassword',
      }, { id: { eq: userId } });
      expect(data[0].id).to.be.eql(userId);
    });
  });
});
