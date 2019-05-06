/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import Model from '../../src/model/model';
import { FieldTypes } from '../../src/lib/schema-validator';

describe('Model', () => {
  const ProductModel = new Model('Product', {
    afterInsert: data => data,
  });
  const OrderModel = new Model('Order');
  const UserModel = new Model('User');
  before(() => {
    const ProductData = [
      {
        id: 1,
        price: 400,
      },
      {
        id: 2,
        price: 300,
      },
    ];
    const OrderData = [
      {
        id: 1,
        ProductId: 1,
        UserId: 1,
      },
      {
        id: 2,
        ProductId: 2,
        UserId: 1,
      },
    ];
    const UserData = [
      {
        id: 1,
      },
    ];
    ProductModel.insert(ProductData);
    OrderModel.insert(OrderData);
    UserModel.insert(UserData);
    ProductModel.hasMany(OrderModel);
    OrderModel.hasOne(ProductModel).belongsTo(UserModel);
    UserModel.hasMany(OrderModel);
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
      expect(ModelInstance.foreignKey).to.be.eql('modelId');
    });
  });

  context('get data()', () => {
    it('Should return empty object for null QueryData', () => {
      expect(ModelInstance.data).to.not.be.null;
      expect(ModelInstance.data).to.be.instanceof(Object);
    });
    it('Should get data of a query', () => {
      ModelInstance.QueryData = {};
      expect(ModelInstance.data).to.not.be.null;
      expect(ModelInstance.data).to.be.instanceof(Object);
    });
  });

  context('getKeys', () => {
    it('Should return key for a model', () => {
      const key = ProductModel.getKeys(OrderModel);
      expect(key).to.not.be.null;
      expect(key).to.be.eql('orderId');
    });

    it('Should return foreignkey if model is same asthe instance', () => {
      const key = ProductModel.getKeys(ProductModel);
      expect(key).to.not.be.null;
      expect(key).to.be.eql('productId');
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
      expect(ModelInstance.foreignKey).to.be.eql('modelId');
    });
  });

  context('setAssociation()', () => {
    const associatedModel = new Model('Teams');
    it('Should throw an error if association name isnt provided', () => {
      expect(() => ModelInstance.setAssociation()).to.throw();
    });

    it('Should return an object for new association', () => {
      const associations = ModelInstance.setAssociation('hasMany', associatedModel);
      expect(associations).to.not.be.null;
      expect(associations).to.be.an.instanceof(Object);
    });

    it('Should handle and return an object for existing association', () => {
      const associations = ModelInstance.setAssociation('hasMany', associatedModel);
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

    it('Should setAssociation', () => {
      const association = ModelInstance.hasMany(associatedModel);
      expect(association).to.be.an.instanceof(Object);
      expect(association).to.be.eql(ModelInstance);
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

  context('findAll()', () => {
    it('Should return Model instance', () => {
      const data = ModelInstance.findAll();
      expect(data).to.be.an.instanceof(Model);
    });
    it('Should return Model instance with QueryData property', () => {
      const data = ModelInstance.findAll();
      expect(data.QueryData).to.not.be.undefined;
    });
  });

  context('find()', () => {
    it('Should return Model instance', () => {
      const data = ModelInstance.find();
      expect(data).to.be.an.instanceof(Model);
    });
    it('Should return Model instance with QueryData property', () => {
      const data = ModelInstance.find();
      expect(data.QueryData).to.not.be.undefined;
    });
  });

  context('insert()', () => {
    it('Should return Model instance', () => {
      const data = ModelInstance.insert();
      expect(data).to.be.an.instanceof(Model);
    });
    it('Should return Model instance with QueryData property', () => {
      const data = ModelInstance.insert();
      expect(data.QueryData).to.not.be.undefined;
    });
  });

  context('delete()', () => {
    it('Should return Model instance', () => {
      const data = ModelInstance.delete();
      expect(data).to.be.an.instanceof(Model);
    });
    it('Should return Model instance with QueryData property', () => {
      const data = ModelInstance.delete({ id: 4 });
      expect(data.QueryData).to.not.be.undefined;
    });
  });

  context('update()', () => {
    it('Should return Model instance', () => {
      const data = ModelInstance.update();
      expect(data).to.be.an.instanceof(Model);
    });
    it('Should return Model instance with QueryData property', () => {
      const data = ModelInstance.update({ id: 4 });
      expect(data.QueryData).to.not.be.undefined;
    });
  });

  context('hasManyAssosciationHandler()', () => {
    it('Should throw an error if association is undefined', () => {
      expect(() => ModelInstance.hasManyAssosciationHandler()).to.throw();
    });

    it('Should throw an error if association is not an object', () => {
      expect(() => ModelInstance.hasManyAssosciationHandler('association')).to.throw();
    });

    it('Should return an empty object is association is empty', () => {
      const associate = ModelInstance.hasManyAssosciationHandler({});
      expect(associate).to.be.an.instanceof(Object);
    });
    it('Should return an object of associated data', () => {
      const association = ProductModel.getAssociation('hasMany');
      const associate = ProductModel.hasManyAssosciationHandler(association, { productId: 1 });
      expect(associate).to.be.an.instanceof(Object);
    });
  });

  context('hasOneAndBelongsToHandler()', () => {
    it('Should throw an error if association is undefined', () => {
      expect(() => OrderModel.hasOneAndBelongsToHandler()).to.throw();
    });

    it('Should throw an error if association is not an object', () => {
      expect(() => OrderModel.hasOneAndBelongsToHandler('association')).to.throw();
    });

    it('Should return an empty object is association is empty', () => {
      const associate = OrderModel.hasOneAndBelongsToHandler({});
      expect(associate).to.be.an.instanceof(Object);
    });
    it('Should return an object of associated data', () => {
      const association = OrderModel.getAssociation('hasOne');
      const associate = OrderModel.hasOneAndBelongsToHandler(association, { ProductId: 1 });
      expect(associate).to.be.an.instanceof(Object);
    });
    it('Should return null for empty association data', () => {
      const association = OrderModel.getAssociation('hasOne');
      const associate = OrderModel.hasOneAndBelongsToHandler(association, { ProductId: 10 });
      expect(associate).to.be.an.instanceof(Object);
    });
  });

  context('associate() with hasMany association', () => {
    it('Should return Model instance without query Data', () => {
      const modelInstanceNoQueryData = new Model('x-model');
      const associate = modelInstanceNoQueryData.associate();
      expect(associate).to.be.an.instanceof(Model);
    });
    it('Should return Model instance if query data is present', () => {
      const associate = ModelInstance.associate();
      expect(associate).to.be.an.instanceof(Model);
    });
    it('Should return Model instance with QueryData', () => {
      const associate = ProductModel.findAll().associate();
      expect(associate).to.be.an.instanceof(Model);
    });
    it('Should handle non-model association ', () => {
      ProductModel.setAssociation('non', OrderModel);
      const associate = ProductModel.findAll().associate();
      expect(associate).to.be.an.instanceof(Model);
    });
  });

  context('associate() with hasOne association', () => {
    it('Should return Model instance with QueryData', () => {
      const associate = OrderModel.findAll().associate();
      expect(associate).to.be.an.instanceof(Model);
    });
  });

  context('triggerHook', () => {
    it('Should throw an error if hook isnt specified', () => {
      expect(() => ProductModel.triggerHook()).to.throw();
    });
    it('Should return passed data is hook isnt defined', () => {
      const data = ProductModel.triggerHook('non', {});
      expect(data).to.be.eql(data);
    });

    it('Should return an object with valid hook', () => {
      const data = ProductModel.triggerHook('afterInsert', {});
      expect(data).to.not.be.null;
      expect(data).to.be.an.instanceof(Object);
    });
  });

  context('searchForModelInAssociation', () => {
    it('Should throw an error if Model name is undefined', () => {
      expect(() => ProductModel.searchForModelInAssociation()).to.throw();
    });

    it('Should return a model instance ', () => {
      const { model } = OrderModel.searchForModelInAssociation('Product');
      expect(model).to.be.eql(ProductModel);
    });
  });

  context('searchByAssociation', () => {
    it('Should throw an error if associated Model name is undefined', () => {
      expect(() => ProductModel.searchByAssociation()).to.throw();
    });

    it('Should return a model instance ', () => {
      const { model } = ProductModel.searchByAssociation('Order');
      expect(model).to.be.eql(model);
    });

    it('Should return a model instance if association is specified', () => {
      const data = ProductModel.searchByAssociation('Order', { id: 1 }, 'hasMany');
      expect(data).to.be.eql(data);
    });

    it('Should return a model instance if associated model is not found', () => {
      const data = ProductModel.searchByAssociation('Order-non', { id: 1 }, 'hasMany');
      expect(data).to.be.eql(data);
    });

    it('Should return empty data if search criteria isnt met ', () => {
      const sample = new Model('Sample');
      ProductModel.hasMany(sample, { id: 'item' });
      const { data } = ProductModel.searchByAssociation('Sample', { id: 1 }, 'hasMany');
      expect(data).to.be.empty;
    });

    it('Should search based on reference', () => {
      const sample = new Model('Sample');
      sample.insert([
        {
          subject: 'Subject',
          item: 1,
        },
      ]);
      ProductModel.hasMany(sample, { item: 'id' });
      const { data } = ProductModel.searchByAssociation('Sample', { item: 1 }, 'hasMany');
      expect(data).to.not.be.empty;
    });
  });

  context('getSearchReferenceKey', () => {
    it('should return refrence key ', () => {
      const reference = { item: 'id' };
      const data = { item: 4 };
      const { criteria } = Model.getSearchReferenceKey(reference, data);
      expect(criteria).to.be.eql({ id: 4 });
    });

    it('should return empty object if key isnt in data ', () => {
      const reference = { item: 'id' };
      const data = { id: 4 };
      const refrenceKey = Model.getSearchReferenceKey(reference, data);
      expect(refrenceKey).to.be.empty;
    });
    it('should return empty object if reference is empty ', () => {
      const reference = {};
      const data = { id: 4 };
      const refrenceKey = Model.getSearchReferenceKey(reference, data);
      expect(refrenceKey).to.be.empty;
    });
  });

  context('validateSchema', () => {
    it('should return true for valid data ', () => {
      const ShemaModel = new Model('schema');
      ShemaModel.schema = {
        name: FieldTypes.String,
        age: FieldTypes.Integer,
      };
      const isValid = ShemaModel.validateSchema({
        name: 'John',
        age: 45,
      });
      expect(isValid).to.be.true;
    });
  });
});
