const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
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
    it('Should return status 401', async () => {
      const { status } = await request
        .post(url)
        .send({ name: 'name' });
      expect(status).to.be.eql(201);
    });
  });
});
