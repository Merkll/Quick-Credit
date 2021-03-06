// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import * as Model from '../model';

const createUsers = async (numberOfUsers) => {
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
  await Model.User.insert(userData);
  return userData;
}; 

const createLoan = async (numberofLoans, numberOfUsers, userData) => {
  const loanData = Array(numberofLoans).fill(0).map(() => ({
    client: userData[faker.random.number({ min: 0, max: numberOfUsers - 2 })].email,
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
  const { data } = await Model.Loan.insert(loanData);
  return data;
};

const createRepayment = async (numberOfRepayments, numberofLoans, loandata) => {
  const repaymentData = Array(numberOfRepayments).fill(0).map(() => ({
    createdOn: new Date(),
    loanId: loandata[faker.random.number({ min: 1, max: numberofLoans - 1 })].id,
    amount: faker.random.number({ min: 2000 }),
  }));
  Model.Repayment.insert(repaymentData);
};

export default async function () { 
  const promiseData = Object.entries(Model).map(async ([, model]) => {
    if (model.initialise) {
      await model.dropTable();
      await model.initialise();
    }
    return true;
  });
  await Promise.all(promiseData);

  if (process.env.ENV === 'test') return false;
  const numberOfUsers = 3;
  const numberofLoans = 2;
  const numberOfRepayments = 1;

  const userData = await createUsers(numberOfUsers);
  const loanData = await createLoan(numberofLoans, numberOfUsers, userData);
  createRepayment(numberOfRepayments, numberofLoans, loanData);
  return true;
}
