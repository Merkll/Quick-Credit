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
  });
});
