/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import faker from 'faker';
import { createRepayment, getLoanRepayments } from '../../src/services/repayment';
import { Loan, Repayment } from '../../src/model';

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
        paymentInstallment: 10000,
        balance: 4000,
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
        paymentInstallment: 5000,
        balance: 4000,
        interest: faker.random.number({ min: 2000 }),
      },
      {
        id: 32,
        user: faker.internet.email(),
        CreatedOn: new Date(),
        status: 'pending',
        repaid: faker.random.boolean(),
        tenor: 1,
        amount: faker.random.number({ min: 3000 }),
        paymentInstallment: 5000,
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
    it('Should return repayment details', () => {
      const data = createRepayment(32);
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
