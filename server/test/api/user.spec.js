/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../../src/app');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

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
      .send(userData);
  });

  context('Query all users', () => {
    const url = '/api/v1/users';
    it('Should return error 405 with non get request', async () => {
      const { status } = await request.post(url);
      expect(status).to.be.eql(405);
    });
    it('Should return data object', async () => {
      const { status, body: { data } } = await request.get(url);
      expect(status).to.be.eql(200);
      expect(data).to.not.be.undefined;
    });
    it('Should return data object if query parameter is presnt', async () => {
      const { status, body: { data } } = await request.get(`${url}?status=verified`);
      expect(status).to.be.eql(200);
      expect(data).to.not.be.undefined;
    });
  });

  context('Query single user', () => {
    it('Should return error 405 with non get request', async () => {
      const { status } = await request.post(userUrl);
      expect(status).to.be.eql(405);
    });
    it('Should return data object', async () => {
      const { status, body: { data } } = await request.get(userUrl);
      expect(status).to.be.eql(200);
      expect(data).to.not.be.undefined;
    });
    it('Should return error object if email oesnt exist', async () => {
      const { status } = await request.get('/api/v1/users/email');
      expect(status).to.be.eql(404);
    });
  });
});
