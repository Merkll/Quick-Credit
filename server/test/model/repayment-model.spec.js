/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import faker from 'faker';
import { Repayment } from '../../src/model';

let RepaymentData;
let insertedData;

describe('Repayment Model', () => {
  before(async () => {
    RepaymentData = Array(10).fill(0).map(() => ({
      createdOn: new Date(),
      loanId: faker.random.number({ max: 12 }),
      amount: faker.random.number({ min: 2000 }),
    }
    ));
    await Repayment.initialise();
    const { data } = await Repayment.insert(RepaymentData);
    insertedData = data;
  });
  
  after(async () => {
    await Repayment.deleteAll();
  });

  describe('Model Initialization', () => {
    it('Should return RepaymentData', async () => {
      const { data } = await Repayment.findAll();
      expect(data).to.be.an('array');
      expect(data[0]).to.have.property('id');
    });
  });

  describe('Repayment update', () => {
    it('Should return RepaymentData', async () => {
      const { id } = insertedData[0];
      const { data } = await Repayment.update({
        amount: 400,
      }, { id: { eq: id } });
      expect(data[0].id).to.be.eql(id);
    });
  });

  describe('Repayment insert non array data', () => {
    it('Should return RepaymentData', async () => {
      const { data } = await Repayment.insert({
        createdOn: new Date(),
        loanId: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000 }),
      });
      expect(data).to.not.undefined;
      expect(data).to.an('array');
    });
  });
});
