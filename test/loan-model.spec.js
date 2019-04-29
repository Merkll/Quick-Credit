/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const faker = require('faker');
const Loan = require('../src/model/loan');

let LoanData;
describe('Loan Model', () => {
  before(() => {
    LoanData = Array(10).fill(0).map(() => ({
      user: faker.internet.email(),
      CreatedOn: new Date(),
      status: 'pending',
      repaid: faker.random.boolean(),
      tenor: faker.random.number({ max: 12 }),
      amount: faker.random.number({ min: 2000 }),
      paymentInstallment: faker.random.number({ min: 2000 }),
      balance: faker.random.number({ min: 2000 }),
      interest: faker.random.number({ min: 2000 }),
    }
    ));
    Loan.insert(LoanData);
  });


  context('Model Initialization', () => {
    it('Should return LoanData', () => {
      const { data } = Loan.findAll();
      expect(data).to.be.eql(LoanData);
    });
  });
});
