// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import * as Model from '../model';

const createUsers = (numberOfUsers) => {
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
  Model.User.insert(userData);
  return userData;
}; 

const createLoan = (numberofLoans, numberOfUsers, userData) => {
  const loanData = Array(numberofLoans).fill(0).map(() => ({
    client: userData[faker.random.number({ min: 0, max: numberOfUsers - 1 })].email,
    createdOn: new Date(),
    status: 'pending',
    repaid: faker.random.boolean(),
    tenor: faker.random.number({ max: 12 }),
    amount: faker.random.number({ min: 2000 }),
    paymentInstallment: faker.random.number({ min: 2000 }),
    balance: faker.random.number({ min: 2000 }),
    interest: faker.random.number({ min: 2000 }),
    purpose: faker.lorem.sentence()
  }));
  Model.Loan.insert(loanData);
};

const createRepayment = (numberOfRepayments, numberofLoans) => {
  const repaymentData = Array(numberOfRepayments).fill(0).map(() => ({
    createdOn: new Date(),
    loanId: faker.random.number({ min: 1, max: numberofLoans }),
    amount: faker.random.number({ min: 2000 }),
  }));
  Model.Repayment.insert(repaymentData);
};

export default function () { 
  if (process.env.NODE_ENV !== 'dev') return false;
  const numberOfUsers = 20;
  const numberofLoans = 15;
  const numberOfRepayments = 25;

  const userData = createUsers(numberOfUsers);
  createLoan(numberofLoans, numberOfUsers, userData);
  createRepayment(numberOfRepayments, numberofLoans);
  return true;
}
