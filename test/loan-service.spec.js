/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const faker = require('faker');
const {
  getLoan,
  getCurrentLoans,
  getRepaidLoans,
  getAllLoans,
  newLoan,
  changeLoanStatus,
} = require('../src/services/loan');
const { Loan } = require('../src/model');

describe('Loan Service', () => {
  context('get specific loan', () => {
    before(() => {
      const loanData = {
        user: faker.internet.email(),
        id: 1,
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
    });
    it('Should throw error if loan is undefined', () => {
      expect(() => getLoan()).to.throw();
    });
    it('Should return object when provided loan', () => {
      const data = getLoan(1);
      expect(data).to.be.an.instanceof(Object);
    });
  });

  context('get current loans', () => {
    before(() => {
      const loanData = {
        user: faker.internet.email(),
        id: 1,
        CreatedOn: new Date(),
        status: 'approved',
        repaid: false,
        tenor: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000 }),
        paymentInstallment: faker.random.number({ min: 2000 }),
        balance: faker.random.number({ min: 2000 }),
        interest: faker.random.number({ min: 2000 }),
      };
      Loan.insert(loanData);
    });
    it('Should return array of object', () => {
      const data = getCurrentLoans();
      expect(data).to.be.an.instanceof(Array);
    });
  });

  context('get repaid loans', () => {
    before(() => {
      const loanData = {
        user: faker.internet.email(),
        id: 1,
        CreatedOn: new Date(),
        status: 'approved',
        repaid: true,
        tenor: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000 }),
        paymentInstallment: faker.random.number({ min: 2000 }),
        balance: faker.random.number({ min: 2000 }),
        interest: faker.random.number({ min: 2000 }),
      };
      Loan.insert(loanData);
    });
    it('Should return array of object', () => {
      const data = getRepaidLoans();
      expect(data).to.be.an.instanceof(Array);
    });
  });

  context('get all loans', () => {
    it('Should return array of object', () => {
      const data = getAllLoans();
      expect(data).to.be.an.instanceof(Array);
    });
  });

  context('Create New Loan', () => {
    const loanData = {
      user: faker.internet.email(),
      CreatedOn: new Date(),
      status: 'pending',
      repaid: faker.random.boolean(),
      tenor: faker.random.number({ max: 12 }),
      amount: faker.random.number({ min: 2000 }),
      paymentInstallment: faker.random.number({ min: 2000 }),
      balance: faker.random.number({ min: 2000 }),
      interest: faker.random.number({ min: 2000 }),
    };

    it('Should throw error if loan Details is undefined', () => {
      expect(() => newLoan()).to.throw();
    });

    it('Should return object of loan details', () => {
      const data = newLoan(loanData);
      expect(data).to.be.an.instanceof(Object);
    });
  });

  context('change loan status', () => {
    const loanData = {
      id: 30,
      user: faker.internet.email(),
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

    it('Should return error object if invalid status', () => {
      const data = changeLoanStatus({ loan: 30, status: 'non' });
      expect(data).to.be.an.instanceof(Object);
      expect(data.code).to.not.null;
    });

    it('Should return object of loan details', () => {
      const data = changeLoanStatus({ loan: 30, status: 'approved' });
      expect(data).to.be.an.instanceof(Object);
    });
  });
});
