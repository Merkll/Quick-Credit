import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../src/app';
import { Repayment, Loan } from '../../src/model';

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

    const loanData = {
      user: faker.internet.email(),
      id: loanId,
      CreatedOn: new Date(),
      status: 'pending',
      repaid: faker.random.boolean(),
      tenor: faker.random.number({ max: 12 }),
      amount: faker.random.number({ min: 2000 }),
      paymentInstallment: faker.random.number({ min: 2000 }),
      balance: faker.random.number({ min: 2000 }),
      interest: faker.random.number({ min: 2000 }),
    };

    Loan.insert(loanData);
    Repayment.insert(RepaymentData);
  });
  context('Query loan repayment', () => {
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.patch(url);
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
  context('new Loan repayment', () => {
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.patch(url);
      expect(status).to.be.eql(405);
    });
    it('Should return status 404 if loan doesnt exist', async () => {
      const { status } = await request
        .post('/api/v1/loans/50/repayments');
      expect(status).to.be.eql(404);
    });

    it('Should return status 201 with post request', async () => {
      const { status } = await request
        .post(url);
      expect(status).to.be.eql(200);
    });
  });
});
