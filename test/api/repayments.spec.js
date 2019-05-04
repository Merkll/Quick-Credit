const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../../src/app');
const { Repayment } = require('../../src/model');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const request = chai.request(app).keepOpen();
const { expect } = chai;

after(() => {
  request.close();
});


describe('Loans', () => {
  const url = '/api/v1/loans/20/repayments';
  const loanId = 20;
  before(() => {
    const RepaymentData = Array(5).fill(0).map((data, index) => ({
      id: index + 1,
      CreatedOn: new Date(),
      loanId,
      amount: faker.random.number({ min: 2000 }),
    }
    ));
    Repayment.insert(RepaymentData);
  });
  context('Query loan repayment', () => {
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.post(url);
      expect(status).to.be.eql(405);
    });
    it('Should return status 404 if no repayment', async () => {
      const { status } = await request.get('/api/v1/loans/50/repayments');
      expect(status).to.be.eql(404);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(url);
      expect(status).to.be.eql(200);
    });
  });
});
