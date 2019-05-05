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

describe('verify client API', () => {
  let verificationUrl;
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
    verificationUrl = `/api/v1/user/${userData.email}/verify`;
    await request
      .post('/api/v1/auth/signup')
      .send(userData);
  });

  context('non suppported methods', () => {
    it('Should return error 405 with get request', async () => {
      const { status } = await request.get(verificationUrl);
      expect(status).to.be.eql(405);
    });
  });
  context('patch request', () => {
    it('Should return status 404 if email doesnt exist', async () => {
      const { body: { status } } = await request.patch('/api/v1/user/email/verify');
      expect(status).to.be.eql(404);
    });
    it('Should return status 200', async () => {
      const { body: { status } } = await request.patch(verificationUrl);
      expect(status).to.be.eql(200);
    });
  });
});
