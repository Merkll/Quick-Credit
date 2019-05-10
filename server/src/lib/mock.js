// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import * as Model from '../model';

export default function () { 
  if (process.env.NODE_ENV !== 'dev') return false;
  const numberOfUsers = 20;
  const numberofLoans = 15;
  const numberOfRepayments = 25;

  const userData = new Array(numberOfUsers - 1).fill(0).map(() => ({
    email: faker.internet.email(),
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    password: faker.random.uuid(),
    address: faker.address.streetAddress(),
    status: 'unverified',
    isAdmin: faker.random.boolean(),
  }));
  userData.push({
    email: 'demouser@demo.com',
    firstName: 'demo',
    lastName: 'user',
    password: 'demouser',
    address: faker.address.streetAddress(),
    status: 'unverified',
    isAdmin: true,
  });

  const loanData = Array(numberofLoans).fill(0).map(() => ({
    user: userData[faker.random.number({ min: 0, max: numberOfUsers - 1 })].email,
    CreatedOn: new Date(),
    status: 'pending',
    repaid: faker.random.boolean(),
    tenor: faker.random.number({ max: 12 }),
    amount: faker.random.number({ min: 2000 }),
    paymentInstallment: faker.random.number({ min: 2000 }),
    balance: faker.random.number({ min: 2000 }),
    interest: faker.random.number({ min: 2000 }),
  }));
  const repaymentData = Array(numberOfRepayments).fill(0).map(() => ({
    CreatedOn: new Date(),
    loanId: faker.random.number({ min: 1, max: numberofLoans }),
    amount: faker.random.number({ min: 2000 }),
  }));

  Model.Loan.insert(loanData);
  Model.User.insert(userData);
  Model.Repayment.insert(repaymentData);
  return true;
}
