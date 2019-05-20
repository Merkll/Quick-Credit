/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import faker from 'faker';
import { 
  verify, getUser, getAllUsers, getUnverifiedUsers, getVerifiedUsers, isUserVerified, filterUsers 
} from '../../src/services/user';
import { User } from '../../src/model';

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
  await User.deleteAll();
});

before(async () => {
  await User.initialise();
  await User.deleteAll();
});

describe('User Service', () => {
  context('verify', () => {
    before(async () => {
      await User.insert(userData);
    });
    it('Should throw error if email is undefined', () => expect(verify()).to.be.eventually.rejected);
    it('Should return object when provided mail', async () => {
      const data = await verify(email);
      expect(data).to.be.an.instanceof(Object);
      expect(data.email).to.be.eql(email);
    });
  });

  context('getUser', () => {
    it('Should throw error if email is undefined', () => expect(getUser()).to.eventually.be.rejected);
    it('Should return object when provided mail', async () => {
      const data = await getUser(email);
      expect(data).to.be.an.instanceof(Object);
      expect(data.email).to.be.eql(email);
    });
    it('Should checkif user is verified', async () => {
      const data = await isUserVerified(email);
      expect(data).to.be.a('boolean');
    });
  });

  context('getAllUsers', () => {
    it('Should return an array of object', async () => {
      const data = await getAllUsers();
      expect(data).to.be.an.instanceof(Array);
    });
    it('Should return unverified users', async () => {
      const data = await getUnverifiedUsers();
      expect(data).to.be.an.instanceof(Array);
    });
    it('Should return verified users', async () => {
      const data = await getVerifiedUsers();
      expect(data).to.be.an.instanceof(Array);
    });
    it('Should return verified users', async () => {
      const data = await getVerifiedUsers();
      expect(data).to.be.an.instanceof(Array);
    });
    it('Should filter users', async () => {
      const data = await filterUsers('unverified');
      expect(data).to.be.an.instanceof(Array);
    });
  });
});
