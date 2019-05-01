/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const faker = require('faker');
const {
  createRepayment,
  getLoanRepayments,
} = require('../src/services/repayment');
const { Loan, Repayment } = require('../src/model');

describe('Repayment Service', () => {
  context('Create repayment', () => {
    const loanData = [
      {
        id: 30,
        user: faker.internet.email(),
        CreatedOn: new Date(),
        status: 'pending',
        repaid: faker.random.boolean(),
        tenor: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000 }),
        paymentInstallment: faker.random.number({ min: 8000 }),
        balance: faker.random.number({ min: 1000, max: 4000 }),
        interest: faker.random.number({ min: 2000 }),
      },
      {
        id: 31,
        user: faker.internet.email(),
        CreatedOn: new Date(),
        status: 'pending',
        repaid: faker.random.boolean(),
        tenor: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 3000 }),
        paymentInstallment: 4000,
        balance: 4000,
        interest: faker.random.number({ min: 2000 }),
      },
    ];
    Loan.insert(loanData);
    it('Should throw error if loan is undefined', () => {
      expect(() => createRepayment()).to.throw();
    });
    it('Should return repayment details', () => {
      const data = createRepayment(30);
      expect(data).to.be.an.instanceof(Object);
    });
    it('Should return repayment details', () => {
      const data = createRepayment(31);
      expect(data).to.be.an.instanceof(Object);
    });
  });

  context('Get loan Repayments', () => {
    before(() => {
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
      const repaymentDetails = [
        {
          amount: 2000,
          loanId: 30,
        },
        {
          amount: 1000,
          loanId: 30,
        },
      ];
      Loan.insert(loanData);
      Repayment.insert(repaymentDetails);
    });
    it('Should throw error if loan is undefined', () => {
      expect(() => getLoanRepayments()).to.throw();
    });
    it('Should return loan repayment details', () => {
      const data = getLoanRepayments(30);
      expect(data).to.be.an.instanceof(Array);
    });
  });
});
