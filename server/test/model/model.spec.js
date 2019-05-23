/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import faker from 'faker';

import Model from '../../src/model/model';

const database = process.env.DB_DATABASE || 'quickCredit';

const UserModel = new Model('User', {
  id: { type: 'integer', format: 'id' },
  createdOn: { type: 'date' },
  email: { 
    type: 'string', format: 'email', required: true, unique: true 
  },
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  password: { type: 'string', required: true },
  address: { type: 'string', required: true },
  status: { type: 'string' },
  isAdmin: { type: 'boolean' }
}, {}, database);

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

const ArticleModel = new Model('Article', {
  id: { type: 'integer', format: 'id' },
  createdOn: { type: 'date' },
  title: { type: 'string', required: true },
  author: { type: 'integer', required: true },
}, {}, database);

UserModel.hasMany(ArticleModel, { author: 'id' });

describe('Data Model', () => {
  before(async () => {
    await ArticleModel.initialise();
    await UserModel.initialise();
    const { data } = await UserModel.insert(UserData);

    const ArticleData = Array(5).fill(0).map((d, i) => ({
      title: faker.lorem.sentence(),
      author: data[i].id
    }
    ));
    await ArticleModel.insert(ArticleData);
  });
  after(async () => {
    await UserModel.deleteAll();
    await ArticleModel.deleteAll();
  });
  describe('Database fields from schema', () => {
    it('Schema should be accesible', () => {
      expect(UserModel.schema).to.not.be.undefined;
    });
    it('Should return an array', () => {
      const definition = UserModel.getDbFieldsFromModelSchema();
      expect(definition).to.be.an.instanceof(Array);
      expect(definition).to.not.be.empty;
    });
  });
  describe('Model initialization', () => {
    it('Should create table', async () => {
      const table = await UserModel.initialise();
      expect(table).to.not.be.undefined;
    });
    it('Model isntance should be accessible', async () => {
      const model = UserModel.Model;
      expect(model).to.be.eql(UserModel);
    });
  });
  describe('Data association', () => {
    it('Should associate data', async () => {
      const { data } = await UserModel.findAll(true);
      expect(data).to.not.be.undefined;
      expect(data).to.be.an('array');
      expect(data).to.not.be.empty;
    });
  });
  describe('Insert Data', () => {
    before(async () => {
      await UserModel.deleteAll();
    });
    it('Should insert data into db', async () => {
      const { data } = await UserModel.insert(UserData);
      expect(data).to.be.an('array');
      expect(data).to.not.be.empty;
    });
  });
  describe('Find All Data', () => {
    it('Should query all user data', async () => {
      const { data } = await UserModel.findAll();
      expect(data).to.not.be.undefined;
      expect(data).to.be.an('array');
      expect(data).to.not.be.empty;
    });
  });
  describe('Find Data by criteria', () => {
    it('Should query all user data', async () => {
      const { data } = await UserModel.find({ status: { eq: 'unverified' } });
      expect(data).to.not.be.undefined;
      expect(data).to.be.an('array');
      expect(data).to.not.be.empty;
    });
  });
  describe('Update data', () => {
    it('Should update data', async () => {
      const { data } = await UserModel.update({ status: 'verified' }, { status: { eq: 'unverified' } });
      expect(data).to.not.be.undefined;
      expect(data).to.be.an('array');
      expect(data).to.not.be.empty;
    });
  });


  describe('Delete data', () => {
    it('Should delete data', async () => {
      const { data } = await UserModel.delete({ status: { eq: 'verified' } });
      expect(data).to.not.be.undefined;
      expect(data).to.be.an('array');
      expect(data).to.not.be.empty;
    });
  });
});
