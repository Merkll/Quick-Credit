const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../../src/app');
const { Loan } = require('../../src/model');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const request = chai.request(app).keepOpen();
const { expect } = chai;

after(() => {
  request.close();
});


describe('Loans', () => {
  let url;
  let loanData;
  before(() => {
    loanData = Array(10).fill(0).map((data, index) => ({
      user: faker.internet.email(),
      id: index + 1,
      CreatedOn: new Date(),
      status: index % 2 === 0 ? 'approved' : 'pending',
      repaid: faker.random.boolean(),
      tenor: faker.random.number({ max: 12 }),
      amount: faker.random.number({ min: 2000 }),
      paymentInstallment: faker.random.number({ min: 2000 }),
      balance: faker.random.number({ min: 2000 }),
      interest: faker.random.number({ min: 2000 }),
    }
    ));
    url = `/api/v1/loans/${loanData[5].id}`;
    Loan.insert(loanData);
  });

  context('Query Single Loan', () => {
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.post(url);
      expect(status).to.be.eql(405);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(url);
      expect(status).to.be.eql(200);
    });

    it('Should return status 404 if loan doesnt exist', async () => {
      const { status } = await request.get('/api/v1/loans/500');
      expect(status).to.be.eql(404);
    });
  });

  context('Query all Loans', () => {
    const loanUrl = '/api/v1/loans';
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.post(loanUrl);
      expect(status).to.be.eql(405);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(loanUrl);
      expect(status).to.be.eql(200);
    });
  });
  context('Query current Loans', () => {
    const loanUrl = '/api/v1/loans?status=approved&repaid=false';
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.post(loanUrl);
      expect(status).to.be.eql(405);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(loanUrl);
      expect(status).to.be.eql(200);
    });
  });
});
