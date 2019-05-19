/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import faker from 'faker';
import { Signin, Signup, validateToken } from '../../src/services/auth';
import { User } from '../../src/model';

chai.use(chaiAsPromised);

const { expect } = chai;

after(async () => {
  await User.deleteAll();
});

before(async () => {
  await User.initialise();
  await User.deleteAll();
});

describe('Auth Service', () => {
  context('Signin', () => {
    const UserData = Array(10).fill(0).map(() => ({
      email: faker.internet.email(),
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      password: faker.random.uuid(),
      address: faker.address.streetAddress(),
      status: 'unverified',
      isAdmin: faker.random.boolean(),
    }
    ));
    const { email, password } = UserData[1];
    before(async () => {
      await User.insert(UserData);
    });
    it('Should return an error Object if user doesnt exist', async () => {
      const data = await Signin({ email: 'email', password });
      expect(data).to.be.an.instanceof(Object);
      expect(data.error).to.not.be.undefined;
    });
    it('Should return an Object of user data if user exist', async () => {
      const data = await Signin({ email, password });
      expect(data).to.be.an.instanceof(Object);
      expect(data.email).to.be.eql(email);
    });

    it('Should return an error Object if password doesnt match', async () => {
      const data = await Signin({ email, password: 'password' });
      expect(data).to.be.an.instanceof(Object);
      expect(data.error).to.not.be.undefined;
    });
    it('Should return an auth token on authentication', async () => {
      const data = await Signin({ email, password });
      expect(data.token).to.not.be.undefined;
    });
  });

  context('Signup', () => {
    const userData = {
      email: faker.internet.email(),
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      password: 'password',
      address: faker.address.streetAddress(),
      status: 'unverified',
      isAdmin: faker.random.boolean(),
      createdOn: new Date(),
    };

    it('Should throw error if email and password is undefined', () => expect(Signup()).to.eventually.be.rejected);
    it('Should return object if userDetails is defined', async () => {
      const data = await Signup(userData);
      expect(data).to.be.an.instanceof(Object);
    });
    it('Should return an error Object if user email exist', async () => {
      const data = await Signup(userData);
      expect(data).to.be.an.instanceof(Object);
      expect(data.error).to.not.be.undefined;
    });
    // it('Should return an error Object if user details isnt valid', async () => {
    // eslint-disable-next-line max-len
    //   const data = await Signup({ ...userData, invalid: 'invalid', email: faker.internet.email() });
    //   expect(data).to.be.an.instanceof(Object);
    //   expect(data.error).to.not.be.null;
    // });
  });

  context('validateToken', () => {
    let userToken;
    let userData;
    before(async () => {
      userData = {
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'unverified',
        isAdmin: faker.random.boolean(),
      };
      const { token } = await Signup(userData);
      userToken = token;
    });

    it('Should return an error Object if token is invalid', async () => {
      const data = await validateToken(faker.random.uuid());
      expect(data).to.be.an.instanceof(Object);
      expect(data.error).to.not.be.undefined;
    });

    it('Should return token data if token is valid', async () => {
      const data = await validateToken(userToken);
      expect(data).to.be.an.instanceof(Object);
      expect(data.token).to.be.eql(userToken);
    });

    it('Should return an error Object if no user exist for token', async () => {
      await User.delete({ email: { eq: userData.email } });
      const data = await validateToken(userToken);
      expect(data).to.be.an.instanceof(Object);
      expect(data.error).to.not.be.undefined;
    });
  });
});
