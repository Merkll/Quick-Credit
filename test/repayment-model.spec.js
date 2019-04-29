/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const faker = require('faker');
const { Repayment } = require('../src/model/');

let RepaymentData;
describe('Repayment Model', () => {
  before(() => {
    RepaymentData = Array(10).fill(0).map((data, index) => ({
      id: index + 1,
      CreatedOn: new Date(),
      loanId: faker.random.number({ max: 12 }),
      amount: faker.random.number({ min: 2000 }),
    }
    ));
    Repayment.insert(RepaymentData);
  });


  context('Model Initialization', () => {
    it('Should return RepaymentData', () => {
      const { data } = Repayment.findAll();
      expect(data).to.be.eql(RepaymentData);
    });
  });
});
