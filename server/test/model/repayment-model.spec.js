/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import faker from 'faker';
import { Repayment } from '../../src/model';

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

  context('Repayment update', () => {
    it('Should return RepaymentData', () => {
      const { id } = RepaymentData[4];
      const data = Repayment.update({
        amount: 400,
      }, { id }).data[0];
      expect(data.id).to.be.eql(id);
    });
  });

  context('Repayment insert non array data', () => {
    it('Should return RepaymentData', () => {
      const data = Repayment.insert({
        id: 66,
        createdOn: new Date(),
        loanId: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000 }),
      }).data[0];
      expect(data.id).to.be.eql(66);
    });
  });
});
