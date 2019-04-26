/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const Model = require('../src/model/model');

describe('Model', () => {
  const ModelInstance = new Model();
  context('Model Instantiation', () => {
    it('Should create an Instance of Model', () => {
      expect(ModelInstance).to.be.an.instanceof(Model);
    });
    it('Model getter Should return an object', () => {
      expect(ModelInstance.Model).to.be.an.instanceof(Object);
      expect(ModelInstance.Model).to.be.eql(ModelInstance);
    });
  });

  context('Model Instantiation', () => {
    it('Should create an Instance of Model', () => {
      expect(ModelInstance).to.be.an.instanceof(Model);
    });
    it('Model getter Should return an object', () => {
      expect(ModelInstance.Model).to.be.an.instanceof(Object);
      expect(ModelInstance.Model).to.be.eql(ModelInstance);
    });
  });

  context('setAssociation()', () => {
    it('Should throw an error if association name isnt provided', () => {
      expect(() => ModelInstance.setAssociation()).to.throw();
    });

    it('Should return an object for new association', () => {
      const associations = ModelInstance.setAssociation('hasMany', 'Products', 'Product');
      expect(associations).to.not.be.null;
      expect(associations).to.be.an.instanceof(Object);
    });

    it('Should handle and return an object for existing association', () => {
      const associations = ModelInstance.setAssociation('hasMany', 'Products', 'Product');
      expect(associations).to.not.be.null;
      expect(associations).to.be.an.instanceof(Object);
    });
  });

  context('getAssociation()', () => {
    it('Should throw an error if association name isnt provided', () => {
      expect(() => ModelInstance.getAssociation()).to.throw();
    });

    it('Should return an Object of associated models', () => {
      const associations = ModelInstance.getAssociation('hasMany');
      expect(associations).to.not.be.null;
      expect(associations).to.be.an.instanceof(Object);
    });

    it('Should return an empty object if association doesnt exist', () => {
      const associations = ModelInstance.getAssociation('hasOne');
      expect(associations).to.not.be.null;
      expect(associations).to.be.an.instanceof(Object);
    });
  });

  context('validateAssociation()', () => {
    const associatedModel = new Model('Product');
    it('Should throw an error if associated model isnt provided', () => {
      expect(() => Model.validateAssociation()).to.throw();
    });

    it('Should throw an error if associated model isnt an instance of Model', () => {
      expect(() => Model.validateAssociation('Product')).to.throw();
    });
    it('Should return an object', () => {
      const association = Model.validateAssociation(associatedModel);
      expect(association).to.be.true;
    });
  });
  context('hasMany Association', () => {
    const associatedModel = new Model('Product');
    it('Should throw an error if associated model isnt provided', () => {
      expect(() => ModelInstance.hasMany()).to.throw();
    });

    it('Should throw an error if associated model isnt an instance of Model', () => {
      expect(() => ModelInstance.hasMany('Product')).to.throw();
    });
    it('Should return an object', () => {
      const association = ModelInstance.hasMany(associatedModel);
      expect(association).to.be.an.instanceof(Object);
      expect(association).to.be.eql(ModelInstance);
    });
    it('Should return object even if associated Model doesnt have a name', () => {
      const associatedModel2 = new Model();
      const association = ModelInstance.hasMany(associatedModel2);
      expect(association).to.be.an.instanceof(Object);
      expect(association).to.be.eql(ModelInstance);
    });
  });

  context('hasOne Association', () => {
    const associatedModel = new Model('Order');
    it('Should throw an error if associated model isnt provided', () => {
      expect(() => ModelInstance.hasOne()).to.throw();
    });

    it('Should throw an error if associated model isnt an instance of Model', () => {
      expect(() => ModelInstance.hasOne('Product')).to.throw();
    });
    it('Should return an object', () => {
      const association = ModelInstance.hasOne(associatedModel);
      expect(association).to.be.an.instanceof(Object);
      expect(association).to.be.eql(ModelInstance);
    });

    it('Should return object even if associated Model doesnt have a name', () => {
      const associatedModel2 = new Model();
      const association = ModelInstance.hasOne(associatedModel2);
      expect(association).to.be.an.instanceof(Object);
      expect(association).to.be.eql(ModelInstance);
    });
  });

  context('belongsTo Association', () => {
    const associatedModel = new Model('Order');
    it('Should throw an error if associated model isnt provided', () => {
      expect(() => ModelInstance.belongsTo()).to.throw();
    });

    it('Should throw an error if associated model isnt an instance of Model', () => {
      expect(() => ModelInstance.belongsTo('Product')).to.throw();
    });
    it('Should return an object', () => {
      const association = ModelInstance.belongsTo(associatedModel);
      expect(association).to.be.an.instanceof(Object);
      expect(association).to.be.eql(ModelInstance);
    });

    it('Should return object even if associated Model doesnt have a name', () => {
      const associatedModel2 = new Model();
      const association = ModelInstance.belongsTo(associatedModel2);
      expect(association).to.be.an.instanceof(Object);
      expect(association).to.be.eql(ModelInstance);
    });
  });
});
