/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import faker from 'faker';
import { createRepayment, getLoanRepayments } from '../../src/services/repayment';
import { Loan, Repayment, User } from '../../src/model';

chai.use(chaiAsPromised);

const { expect } = chai;

const email = faker.internet.email();
const userData = {
  email,
  firstName: faker.name.findName(),
  lastName: faker.name.lastName(),
  password: faker.random.uuid(),
  address: faker.address.streetAddress(),
  status: 'unverified',
  isAdmin: faker.random.boolean(),
};

after(async () => {
  await Loan.deleteAll();
  await Repayment.deleteAll();
  await User.deleteAll();
});

before(async () => {
  await Loan.initialise();
  await Repayment.initialise();
  await User.initialise();
  await Loan.deleteAll();
  await Repayment.deleteAll();
  await User.deleteAll();
  await User.insert(userData);
});

describe('Repayment Service', () => {
  context('Create repayment', async () => {
    let loadId;
    before(async () => {
      const loanData = [
        {
          client: faker.internet.email(),
          createdOn: new Date(),
          status: 'pending',
          repaid: faker.random.boolean(),
          tenor: faker.random.number({ max: 12 }),
          amount: faker.random.number({ min: 2000 }),
          paymentInstallment: 10000,
          balance: 4000,
          interest: faker.random.number({ min: 2000 }),
          purpose: faker.lorem.sentence(),
        },
        {
          client: faker.internet.email(),
          createdOn: new Date(),
          status: 'pending',
          repaid: faker.random.boolean(),
          tenor: faker.random.number({ max: 12 }),
          amount: faker.random.number({ min: 3000 }),
          paymentInstallment: 5000,
          balance: 4000,
          interest: faker.random.number({ min: 2000 }),
          purpose: faker.lorem.sentence(),
        },
        {
          client: email,
          createdOn: new Date(),
          status: 'pending',
          repaid: faker.random.boolean(),
          tenor: 1,
          amount: faker.random.number({ min: 3000 }),
          paymentInstallment: 5000,
          balance: 4000,
          interest: faker.random.number({ min: 2000 }),
          purpose: faker.lorem.sentence(),
        },
      ];
      const { data } = await Loan.insert(loanData);
      loadId = [data[0].id, data[0].id, data[0].id];
    });
    it('Should throw error if loan is undefined', () => expect(createRepayment()).to.be.eventually.rejected);
    it('Should return repayment details', async () => {
      const data = await createRepayment(loadId[0]);
      expect(data).to.be.an.instanceof(Object);
    });
    it('Should return repayment details', async () => {
      const data = await createRepayment(loadId[1]);
      expect(data).to.be.an.instanceof(Object);
    });
    it('Should return repayment details', async () => {
      const data = await createRepayment(loadId[2]);
      expect(data).to.be.an.instanceof(Object);
    });
  });

  context('Get loan Repayments', () => {
    let loanId;
    before(async () => {
      const { data } = await Loan.insert({
        client: faker.internet.email(),
        createdOn: new Date(),
        status: 'pending',
        repaid: faker.random.boolean(),
        tenor: faker.random.number({ max: 12 }),
        amount: faker.random.number({ min: 2000 }),
        paymentInstallment: faker.random.number({ min: 2000 }),
        balance: faker.random.number({ min: 2000 }),
        interest: faker.random.number({ min: 2000 }),
        purpose: faker.lorem.sentence(),
      });
      const repaymentDetails = [
        {
          amount: 2000,
          loanId: data[0].id,
        },
        {
          amount: 1000,
          loanId: data[0].id,
        },
      ];
      loanId = data[0].id;
      await Repayment.insert(repaymentDetails);
    });
    it('Should throw error if loan is undefined', () => expect(getLoanRepayments()).to.be.eventually.rejected);
    it('Should return loan repayment details', async () => {
      const data = await getLoanRepayments(loanId);
      expect(data).to.be.an.instanceof(Array);
    });
  });
});
