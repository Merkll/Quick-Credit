/* eslint-disable import/named */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../src/app';
import { Loan } from '../../src/model';

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
      const { status } = await request.patch(loanUrl);
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
      const { status } = await request.patch(loanUrl);
      expect(status).to.be.eql(405);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(loanUrl);
      expect(status).to.be.eql(200);
    });
  });
  context('Query repaid Loans', () => {
    const loanUrl = '/api/v1/loans?status=approved&repaid=true';
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.patch(loanUrl);
      expect(status).to.be.eql(405);
    });

    it('Should return status 200 with get request', async () => {
      const { status } = await request.get(loanUrl);
      expect(status).to.be.eql(200);
    });
  });
  context('Loan application', () => {
    const loanUrl = '/api/v1/loans';
    it('Should return error 405 with non-get request', async () => {
      const { status } = await request.put(loanUrl);
      expect(status).to.be.eql(405);
    });

    it('Should return status 201 with get request', async () => {
      const { status } = await request
        .post(loanUrl)
        .send(loanData[2]);
      expect(status).to.be.eql(201);
    });

    it('Should return error object if request body is invalid', async () => {
      const { status } = await request
        .post(loanUrl);
      expect(status).to.be.eql(422);
    });
  });

  context('Loan Approval', () => {
    it('Should return error 405 with non-patch request', async () => {
      const { status } = await request.post(url);
      expect(status).to.be.eql(405);
    });

    it('Should return status 201 with patch request', async () => {
      const { status } = await request
        .patch(url)
        .send({ status: 'approved' });
      expect(status).to.be.eql(200);
    });

    it('Should return status 201 with patch request', async () => {
      const { status } = await request
        .patch(url)
        .send({ status: 'unknown' });
      expect(status).to.be.eql(422);
    });
    it('Should return status 404 if loan doesnt exist', async () => {
      const { status } = await request
        .patch('/api/v1/loans/45')
        .send({ status: 'approved' });
      expect(status).to.be.eql(404);
    });
  });
});
