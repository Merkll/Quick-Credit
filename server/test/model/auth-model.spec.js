/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import faker from 'faker';
import { Auth } from '../../src/model';

let authId;

describe('Auth Model', () => {
  before(async () => {
    const AuthData = Array(10).fill(0).map((data, index) => ({
      token: faker.lorem.sentences(),
      email: faker.lorem.sentence(),
      client: index + 1,
    }
    ));
    await Auth.initialise();
    const { data } = await Auth.insert(AuthData);
    authId = data[0].id;
  });
  after(async () => {
    await Auth.deleteAll();
  });
  context('Model Initialization', () => {
    it('Should return AuthData', async () => {
      const { data } = await Auth.findAll();
      expect(data).to.be.an('array');
      expect(data[0]).to.have.property('id');
    });
  });

  context('Auth update', () => {
    it('Should return AuthData', async () => {
      const { data } = await Auth.update({
        token: 'authtoken',
      }, { id: { eq: authId } });
      expect(data[0].id).to.be.eql(authId);
    });
  });

  context('Auth insert non array data', () => {
    it('Should return AuthData', async () => {
      const { data } = await Auth.insert({
        token: faker.lorem.sentences(),
        email: faker.lorem.sentence(),
        client: 55,
      });
      expect(data[0].client).to.be.eql(55);
    });
  });
});
