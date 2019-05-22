/* eslint-disable import/named */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../src/app';
import { Loan } from '../../src/model';
import { generateToken } from '../../src/helpers/auth';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const token = generateToken({ id: 3, email: 'johndoe@demo.com', isAdmin: true });
const authHeader = ['Authorization', token];

const request = chai.request(app).keepOpen();
const { expect } = chai;

after(async () => {
  request.close();
});

describe('Loans', () => {
  after(async () => {
    await Loan.deleteAll();
  });
  
  let url;
  let loanData;
  before(async () => {
    await Loan.initialise();
    loanData = Array(10).fill(0).map((data, index) => ({
      client: faker.internet.email(),
      createdOn: new Date(),
      status: index % 2 === 0 ? 'approved' : 'pending',
      repaid: faker.random.boolean(),
      tenor: faker.random.number({ max: 12 }),
      amount: faker.random.number({ min: 20000, max: 80000 }),
      paymentInstallment: faker.random.number({ min: 2000, max: 8000 }),
      balance: faker.random.number({ min: 2000, max: 8000 }),
      interest: faker.random.number({ min: 2000, max: 8000 }),
      purpose: faker.lorem.sentence()
    }
    ));
    const { data } = await Loan.insert(loanData);
    url = `/api/v1/loans/${data[0].id}`;
  });
  context('Query Single Loan', () => {
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.post(url).set(...authHeader);
      expect(status).to.be.eql(405);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(url).set(...authHeader);
      expect(status).to.be.eql(200);
    });

    it('Should return status 404 if loan doesnt exist', async () => {
      const { status } = await request.get('/api/v1/loans/500').set(...authHeader);
      expect(status).to.be.eql(404);
    });
  });

  context('Query all Loans', () => {
    const loanUrl = '/api/v1/loans';
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.patch(loanUrl).set(...authHeader);
      expect(status).to.be.eql(405);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(loanUrl).set(...authHeader);
      expect(status).to.be.eql(200);
    });
  });
  context('Query current Loans', () => {
    const loanUrl = '/api/v1/loans?status=approved&repaid=false';
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.patch(loanUrl).set(...authHeader);
      expect(status).to.be.eql(405);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(loanUrl).set(...authHeader);
      expect(status).to.be.eql(200);
    });
  });
  context('Query repaid Loans', () => {
    const loanUrl = '/api/v1/loans?status=approved&repaid=true';
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.patch(loanUrl).set(...authHeader);
      expect(status).to.be.eql(405);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(loanUrl).set(...authHeader);
      expect(status).to.be.eql(200);
    });
  });
  context('Loan application', () => {
    const loanUrl = '/api/v1/loans';
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.put(loanUrl).set(...authHeader);
      expect(status).to.be.eql(405);
    });

    it('Should return status 201 with post request', async () => {
      const { status } = await request
        .post(loanUrl)
        .set(...authHeader)
        .send(loanData[2]);
      expect(status).to.be.eql(201);
    });

    it('Should return error object if request body is invalid', async () => {
      const { status } = await request
        .post(loanUrl).set(...authHeader);
      expect(status).to.be.eql(422);
    });
  });

  context('Loan Approval', () => {
    it('Should return error 405 with non-patch request', async () => {
      const { status } = await request.post(url).set(...authHeader);
      expect(status).to.be.eql(405);
    });

    it('Should return status 201 with patch request', async () => {
      const { status } = await request
        .patch(url).set(...authHeader)
        .send({ status: 'approved' });
      expect(status).to.be.eql(200);
    });

    it('Should return status 201 with patch request', async () => {
      const { status } = await request
        .patch(url).set(...authHeader)
        .send({ status: 'unknown' });
      expect(status).to.be.eql(422);
    });
    it('Should return status 404 if loan doesnt exist', async () => {
      const { status } = await request
        .patch('/api/v1/loans/10045')
        .set(...authHeader)
        .send({ status: 'approved' });
      expect(status).to.be.eql(404);
    });
  }).timeout(5000);
});
