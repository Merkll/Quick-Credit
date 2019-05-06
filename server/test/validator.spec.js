/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import { Validator, FieldTypes } from '../src/lib/schema-validator';

describe('Schema validator', () => {
  context('Schema validation', () => {
    const schema = {
      name: FieldTypes.String,
      age: FieldTypes.Integer,
    };
    const validator = new Validator(schema);
    it('Should true', async () => {
      const data = {
        name: 'johnDoe',
        age: 35,
      };
      const isValid = validator.validate(data);
      expect(isValid).to.be.true;
    });
    it('Should false', async () => {
      const data = {
        name: 50,
        age: 'age',
      };
      const isValid = validator.validate(data);
      expect(isValid).to.be.false;
    });
    it('Should return true for empty object', async () => {
      const isValid = validator.validate();
      expect(isValid).to.be.true;
    });
    it('Should return false for invalid array of data', async () => {
      const data = [
        {
          name: 50,
          age: 'age',
        },
        {
          name: 50,
          age: 'age',
        },
      ];
      const isValid = validator.validate(data);
      expect(isValid).to.be.false;
    });
    it('Should return true for valid array of data', async () => {
      const data = [
        {
          name: 'Mike',
          age: 40,
        },
        {
          name: 'john',
          age: 30,
        },
      ];
      const isValid = validator.validate(data);
      expect(isValid).to.be.true;
    });

    it('Should return false for mix of valid and invalid array of data', async () => {
      const data = [
        {
          name: 'Mike',
          age: 40,
        },
        {
          name: 'john',
          age: 30,
        },
        {
          name: 50,
          age: 'age',
        },
      ];
      const isValid = validator.validate(data);
      expect(isValid).to.be.false;
    });
  });
  context('fieldTypes', () => {
    it('Should check boolean', () => {
      expect(FieldTypes.Boolean(true)).to.be.true;
      expect(FieldTypes.Boolean('true')).to.be.true;
      expect(FieldTypes.Boolean(34)).to.be.false;
    });
    it('Should check String', () => {
      expect(FieldTypes.String('true')).to.be.true;
      expect(FieldTypes.String(true)).to.be.false;
      expect(FieldTypes.String(34)).to.be.false;
    });
    it('Should check Integer', () => {
      expect(FieldTypes.Integer(40)).to.be.true;
      expect(FieldTypes.Integer(true)).to.be.false;
      expect(FieldTypes.Integer('34')).to.be.false;
    });
    it('Should check Date', () => {
      expect(FieldTypes.Date(new Date())).to.be.true;
      expect(FieldTypes.Date('34')).to.be.false;
    });
    it('Should check Number', () => {
      expect(FieldTypes.Number(40)).to.be.true;
      expect(FieldTypes.Number(13000.8)).to.be.true;
    });
  });
});
