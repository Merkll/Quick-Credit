/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const User = require('../src/model/user');

describe('User Model', () => {
  before(() => {
    const UserData = [
      {
        email: 'String',
        firstName: 'String',
        lastName: 'String',
        password: 'String',
        address: 'String',
        status: 'String',
        isAdmin: 'Boolean',
      }
    ];
  });
  const ModelInstance = new Model('Model');
  context('Model Instantiation', () => {
    it('Should create an Instance of Model', () => {
      expect(ModelInstance).to.be.an.instanceof(Model);
    });
    it('Model getter Should return an object', () => {
      expect(ModelInstance.Model).to.be.an.instanceof(Object);
      expect(ModelInstance.Model).to.be.eql(ModelInstance);
    });
  });

  context('Model Initialization', () => {
    it('Should create a MemDB collection', () => {
      const init = ModelInstance.init();
      expect(init).to.not.be.null;
      expect(init).to.be.an.instanceof(Object);
    });

    it('Should return empty Object if modelName is undefined', () => {
      const ModelWithoutName = new Model();
      const init = ModelWithoutName.init();
      expect(init).to.not.be.null;
      expect(init).to.be.an.instanceof(Object);
      expect(init).to.be.empty;
    });

    it('Model getter Should return an object', () => {
      expect(ModelInstance.Model).to.be.an.instanceof(Object);
      expect(ModelInstance.Model).to.be.eql(ModelInstance);
    });

    it('Should get ForeignKey', () => {
      expect(ModelInstance.foreignKey).to.not.be.null;
      expect(ModelInstance.foreignKey).to.be.eql('ModelId');
    });
  });
});
