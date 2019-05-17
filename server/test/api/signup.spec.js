/* eslint-disable import/named */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../src/app';
import { User } from '../../src/model';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const request = chai.request(app).keepOpen();
const { expect } = chai;

before(async () => {
  await User.initialise();
  await User.deleteAll();
});
after(async () => {
  request.close();
  await User.deleteAll();
});

describe('Signup API', () => {
  const url = '/api/v1/auth/signup';
  const userData = {
    email: faker.internet.email(),
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    password: faker.random.uuid(),
    address: faker.address.streetAddress(),
    status: 'unverified',
    isAdmin: faker.random.boolean(),
  };
  context('non suppported methods', () => {
    it('Should return error 405 with get request', async () => {
      const { body: { status } } = await request.get(url);
      expect(status).to.be.eql(405);
    });
  });
  context('post request', () => {
    it('Should return status 422', async () => {
      const { status } = await request.post(url);
      expect(status).to.be.eql(422);
    });
    it('Should return status 201', async () => {
      const { status, body: { data } } = await request
        .post(url)
        .send(userData);
      expect(status).to.be.eql(201);
      expect(data.email).to.be.eqls(userData.email);
    });

    it('Should return status 400 if user exists', async () => {
      const { status } = await request
        .post(url)
        .send(userData);
      expect(status).to.be.eql(409);
    });
  });
});
