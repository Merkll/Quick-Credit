/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';

import { replaceString } from '../src/lib/util';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const { expect } = chai;

describe('Util', () => {
  describe('string replace with object data', () => {
    it('should return replace string', () => {
      const string = 'My name is {{name}}, I am {{age}} years old';
      const replaced = replaceString(string, {
        name: 'John',
        age: 45
      });
      expect(replaced).to.be.eql('My name is John, I am 45 years old');
    });
  });
});
