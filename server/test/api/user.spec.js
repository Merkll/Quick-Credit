/* eslint-disable no-unused-expressions */
import chai from 'chai';

import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../src/app';
import { generateToken } from '../../src/helpers/auth';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const token = generateToken({ id: 3 });
const authHeader = ['Authorization', token];

const request = chai.request(app).keepOpen();
const { expect } = chai;

after(() => {
  request.close();
});

describe('User API', () => {
  let userUrl;
  before(async () => {
    const userData = {
      email: faker.internet.email(),
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      password: faker.random.uuid(),
      address: faker.address.streetAddress(),
      status: 'unverified',
      isAdmin: faker.random.boolean(),
    };
    userUrl = `/api/v1/users/${userData.email}`;
    await request
      .post('/api/v1/auth/signup')
      .set(...authHeader)
      .send(userData);
  });

  context('Query all users', () => {
    const url = '/api/v1/users';
    it('Should return error 405 with non get request', async () => {
      const { status } = await request.post(url).set(...authHeader);
      expect(status).to.be.eql(405);
    });
    it('Should return data object', async () => {
      const { status, body: { data } } = await request.get(url).set(...authHeader);
      expect(status).to.be.eql(200);
      expect(data).to.not.be.undefined;
    });
    it('Should return data object if query parameter is presnt', async () => {
      const { status, body: { data } } = await request.get(`${url}?status=verified`).set(...authHeader);
      expect(status).to.be.eql(200);
      expect(data).to.not.be.undefined;
    });
  });

  context('Query single user', () => {
    it('Should return error 405 with non get request', async () => {
      const { status } = await request.post(userUrl).set(...authHeader);
      expect(status).to.be.eql(405);
    });
    it('Should return data object', async () => {
      const { status, body: { data } } = await request.get(userUrl).set(...authHeader);
      expect(status).to.be.eql(200);
      expect(data).to.not.be.undefined;
    });
    it('Should return error object if email oesnt exist', async () => {
      const { status } = await request.get('/api/v1/users/email').set(...authHeader);
      expect(status).to.be.eql(404);
    });
  });
});
