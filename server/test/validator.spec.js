/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import faker from 'faker';

import Validator from '../src/lib/schema-validator';

describe('Schema validation', () => {
  context('Schema validation', () => {
    const schema = {
      id: { type: 'integer', format: 'myId', fieldName: 'ID' },
      createdOn: { type: 'date' },
      updatedOn: { type: 'date' },
      email: { 
        type: 'string', format: 'myEmail', required: true, unique: true, fieldName: 'Email' 
      },
      firstName: { type: 'string', required: true },
      lastName: { type: 'string', required: true },
      password: { type: 'string', required: true },
      address: { type: 'string', required: true },
      status: { type: 'string' },
      isAdmin: { type: 'boolean' },
    };
    it('Should object with valid property true for valid data', async () => {
      const data = {
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'unverified',
        isAdmin: faker.random.boolean(),
      };
      const { valid } = Validator.schema(data, { schema, table: 'users' });
      expect(valid).to.be.true;
    });
    it('Should object with valid property false and array of error for invalid data', async () => {
      const data = {
        id: 'id',
        // email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'unverified',
        isAdmin: faker.random.boolean(),
      };
      const { valid, errors } = Validator.schema(data, { schema, table: 'users' });
      expect(valid).to.be.false;
      expect(errors).to.not.be.empty;
    });
    it('Should accept array of data', async () => {
      const data = [{
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'unverified',
        isAdmin: faker.random.boolean(),
      },
      {
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        password: faker.random.uuid(),
        address: faker.address.streetAddress(),
        status: 'unverified',
        isAdmin: faker.random.boolean(),
      }];
      const { valid } = Validator.schema(data, { schema, table: 'users' });
      expect(valid).to.be.true;
    });
  });
  context('Schema validation for data update', () => {
    const schema = {
      id: { type: 'integer', format: 'myId' },
      createdOn: { type: 'date' },
      updatedOn: { type: 'date' },
      email: { 
        type: 'string', format: 'myEmail', required: true, unique: true, 
      },
      firstName: { type: 'string', required: true },
      lastName: { type: 'string', required: true },
      password: { type: 'string', required: true },
      address: { type: 'string', required: true },
      status: { type: 'string' },
      isAdmin: { type: 'boolean' },
    };
    it('Should object with valid property true for valid data', async () => {
      const data = {
        email: faker.internet.email(),
        firstName: faker.name.findName(),
      };
      const { valid } = Validator.validateSchemaForUpdate(data, schema);
      expect(valid).to.be.true;
    });
    it('Should object with valid property false for invalid data', async () => {
      const data = {
        email: faker.internet.email(),
        firstName: faker.name.findName(),
        nonfield: 'field'
      };
      const { valid, errors } = Validator.validateSchemaForUpdate(data, schema);
      expect(valid).to.be.false;
      expect(errors).to.not.empty;
    });
    it('Should object with valid property false for invalid datatype', async () => {
      const data = {
        email: 'email',
        firstName: faker.name.findName(),
      };
      const { valid, errors } = Validator.validateSchemaForUpdate(data, schema);
      expect(valid).to.be.false;
      expect(errors).to.not.empty;
    });
  });
});
