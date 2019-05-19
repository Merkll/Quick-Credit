/* eslint-disable import/named */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../src/app';
import { User, Auth } from '../../src/model';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const request = chai.request(app).keepOpen();
const { expect } = chai;

before(async () => {
  await User.initialise();
  await Auth.initialise();
  await User.deleteAll();
});
after(async () => {
  request.close();
  await User.deleteAll();
  await Auth.deleteAll();
});

describe('PASSWORD RESET API', () => {
  let userData;
  let url;
  before(async () => {
    userData = {
      email: faker.internet.email(),
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      password: faker.random.uuid(),
      address: faker.address.streetAddress(),
      status: 'unverified',
      isAdmin: faker.random.boolean(),
    };
    await request
      .post('/api/v1/auth/signup')
      .send(userData);
    url = `/api/v1/auth/${userData.email}/password-reset`;
  });

  context('non suppported methods', () => {
    it('Should return error 405 with get request', async () => {
      const { body: { status } } = await request.put(url);
      expect(status).to.be.eql(405);
    });
  });
  context('Password reset', () => {
    it('Should return status 200', async () => {
      const { status } = await request.get(url);
      expect(status).to.be.eql(200);
    }).timeout(5000);
  });
  context('Change Password', () => {
    const authToken = faker.random.uuid();
    before(async () => {
      userData = {
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'unverified',
        isAdmin: faker.random.boolean(),
      };
      await request
        .post('/api/v1/auth/signup')
        .send(userData);
      url = `/api/v1/auth/${userData.email}/password-reset`;
      await Auth.insert({ email: userData.email, token: authToken });
    });
    it('Should return status 200', async () => {
      const { status } = await request.patch(url)
        .send({ password: 'newPassword', token: authToken });
      expect(status).to.be.eql(200);
    }).timeout(5000);
  });
});
