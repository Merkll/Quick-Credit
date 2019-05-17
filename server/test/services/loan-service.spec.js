/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import faker from 'faker';
import { 
  getLoan, getCurrentLoans, getRepaidLoans, getAllLoans, newLoan, changeLoanStatus, 
} from '../../src/services/loan';
import { Loan } from '../../src/model';

chai.use(chaiAsPromised);

const { expect } = chai;

after(async () => {
  await Loan.deleteAll();
});

before(async () => {
  await Loan.deleteAll();
  await Loan.initialise();
});

describe('Loan Service', () => {
  context('get specific loan', () => {
    let loanId;
    before(async () => {
      const loanData = {
        client: faker.internet.email(),
        createdOn: new Date(),
        status: 'pending',
        repaid: faker.random.boolean(),
        tenor: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000, max: 5000 }),
        paymentInstallment: faker.random.number({ min: 2000, max: 5000 }),
        balance: faker.random.number({ min: 2000, max: 5000 }),
        interest: faker.random.number({ min: 2000, max: 5000 }),
        purpose: faker.lorem.sentence(),
      };
      const { data } = await Loan.insert(loanData);
      loanId = data[0].id;
    });
    it('Should throw error if loan is undefined', () => expect(getLoan()).to.be.eventually.rejected);
    it('Should return object when provided loan', async () => {
      const data = await getLoan(loanId);
      expect(data).to.be.an.instanceof(Object);
    });
  });

  context('get current loans', () => {
    before(async () => {
      const loanData = {
        client: faker.internet.email(),
        createdOn: new Date(),
        status: 'approved',
        repaid: false,
        tenor: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000, max: 5000 }),
        paymentInstallment: faker.random.number({ min: 2000, max: 5000 }),
        balance: faker.random.number({ min: 2000, max: 5000 }),
        interest: faker.random.number({ min: 2000, max: 5000 }),
        purpose: faker.lorem.sentence(),
      };
      await Loan.insert(loanData);
    });
    it('Should return array of object', async () => {
      const data = await getCurrentLoans();
      expect(data).to.be.an.instanceof(Array);
    });
    it('Should return user current loan is user is supplied', async () => {
      const data = await getCurrentLoans({ email: 'johndoe@gmail.com' });
      expect(data).to.be.an.instanceof(Array);
    });
  });

  context('get repaid loans', () => {
    before(async () => {
      const loanData = {
        client: faker.internet.email(),
        createdOn: new Date(),
        status: 'approved',
        repaid: true,
        tenor: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000, max: 5000 }),
        paymentInstallment: faker.random.number({ min: 2000, max: 5000 }),
        balance: faker.random.number({ min: 2000, max: 5000 }),
        interest: faker.random.number({ min: 2000, max: 5000 }),
        purpose: faker.lorem.sentence(),
      };
      await Loan.insert(loanData);
    });
    it('Should return array of object', async () => {
      const data = await getRepaidLoans();
      expect(data).to.be.an.instanceof(Array);
    });
    it('Should return user specific repaid loans is user is supplied', async () => {
      const data = await getRepaidLoans({ email: 'johndoe@gmail.com' });
      expect(data).to.be.an.instanceof(Array);
    });
  });

  context('get all loans', () => {
    it('Should return array of object', async () => {
      const data = await getAllLoans();
      expect(data).to.be.an.instanceof(Array);
    });
    it('Should return user specific loan is user is supplied', async () => {
      const data = await getAllLoans({ email: 'johndoe@gmail.com' });
      expect(data).to.be.an.instanceof(Array);
    });
  });

  context('Create New Loan', () => {
    const loanData = {
      client: faker.internet.email(),
      createdOn: new Date(),
      status: 'pending',
      repaid: faker.random.boolean(),
      tenor: faker.random.number({ max: 12 }),
      amount: faker.random.number({ min: 2000, max: 5000 }),
      paymentInstallment: faker.random.number({ min: 2000, max: 5000 }),
      balance: faker.random.number({ min: 2000, max: 5000 }),
      interest: faker.random.number({ min: 2000, max: 5000 }),
      purpose: faker.lorem.sentence(),
    };

    it('Should throw error if loan Details is undefined', () => expect(newLoan()).to.eventually.be.rejected);

    it('Should return object of loan details', async () => {
      const data = await newLoan(loanData);
      expect(data).to.be.an.instanceof(Object);
    });

    // it('Should return an error object if loan details is invalid', async () => {
    //   const data = await newLoan({ ...loanData, invalid: 'invalid' });
    //   expect(data).to.be.an.instanceof(Object);
    //   expect(data.error).to.not.be.null;
    // });
  });

  context('change loan status', () => {
    let loanId;
    before(async () => {
      const loanData = {
        client: faker.internet.email(),
        createdOn: new Date(),
        status: 'pending',
        repaid: faker.random.boolean(),
        tenor: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000, max: 5000 }),
        paymentInstallment: faker.random.number({ min: 2000, max: 5000 }),
        balance: faker.random.number({ min: 2000, max: 5000 }),
        interest: faker.random.number({ min: 2000, max: 5000 }),
        purpose: faker.lorem.sentence(),
      };
      const { data } = await Loan.insert(loanData);
      loanId = data[0].id;
    });

    it('Should return error object if invalid status', async () => {
      const data = await changeLoanStatus({ loan: loanId, status: 'non' });
      expect(data).to.be.an.instanceof(Object);
      expect(data.code).to.not.be.null;
    });

    it('Should return object of loan details', async () => {
      const data = await changeLoanStatus({ loan: loanId, status: 'approved' });
      expect(data).to.be.an.instanceof(Object);
    });
  });
});
