/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import faker from 'faker';
import { Loan } from '../../src/model';

let LoanData;

before(async () => {
  LoanData = Array(10).fill(0).map(() => ({
    client: faker.internet.email(),
    createdOn: new Date(),
    status: 'pending',
    repaid: faker.random.boolean(),
    tenor: faker.random.number({ max: 12 }),
    amount: faker.random.number({ min: 2000, max: 900000 }),
    paymentInstallment: faker.random.number({ min: 2000, max: 9000 }),
    balance: faker.random.number({ min: 2000, max: 50000 }),
    interest: faker.random.number({ min: 2000, max: 50000 }),
    purpose: faker.lorem.sentence(),
  }
  ));
  await Loan.initialise();
  await Loan.deleteAll();
  await Loan.insert(LoanData);
});

after(async () => {
  await Loan.deleteAll();
});

describe('Loan Model', () => {
  context('Model Initialization', () => {
    it('Should return LoanData', async () => {
      const { data } = await Loan.findAll();
      expect(data).to.be.an.instanceof(Array);
    });
  });
});
