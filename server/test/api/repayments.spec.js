/* eslint-disable import/named */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../src/app';
import { Repayment, Loan } from '../../src/model';
import { generateToken } from '../../src/helpers/auth';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const token = generateToken({ id: 3, isAdmin: true });
const authHeader = ['Authorization', token];

const request = chai.request(app).keepOpen();
const { expect } = chai;

after(async () => {
  request.close();
  await Repayment.deleteAll();
  await Loan.deleteAll();
});

describe('repayments', () => {
  let url;
  let loanId;
  before(async () => {
    await Repayment.initialise();
    await Loan.initialise();
    await Loan.deleteAll();
    await Repayment.deleteAll();
    const loanData = {
      client: faker.internet.email(),
      createdOn: new Date(),
      status: 'pending',
      repaid: faker.random.boolean(),
      tenor: faker.random.number({ max: 12 }),
      amount: faker.random.number({ min: 2000 }),
      paymentInstallment: faker.random.number({ min: 2000 }),
      balance: faker.random.number({ min: 2000 }),
      interest: faker.random.number({ min: 2000 }),
      purpose: faker.lorem.sentence()
    };
    const { data } = await Loan.insert(loanData);
    loanId = data[0].id;
    url = `/api/v1/loans/${loanId}/repayments`;

    const RepaymentData = Array(5).fill(0).map(() => ({
      createdOn: new Date(),
      loanId,
      amount: 55555,
    }
    ));

    await Repayment.insert(RepaymentData);
  });
  context('Query loan repayment', () => {
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.patch(url).set(...authHeader);
      expect(status).to.be.eql(405);
    });
    it('Should return status 404 if no repayment', async () => {
      const { status } = await request.get('/api/v1/loans/5000/repayments').set(...authHeader);
      expect(status).to.be.eql(404);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(url).set(...authHeader);
      expect(status).to.be.eql(200);
    });
  });
  context('new Loan repayment', () => {
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.patch(url).set(...authHeader);
      expect(status).to.be.eql(405);
    });
    it('Should return status 404 if loan doesnt exist', async () => {
      const { status } = await request
        .post('/api/v1/loans/500/repayments').set(...authHeader);
      expect(status).to.be.eql(404);
    });

    it('Should return status 201 with post request', async () => {
      const { status } = await request
        .post(url)
        .set(...authHeader);
      expect(status).to.be.eql(201);
    });
  });
});
