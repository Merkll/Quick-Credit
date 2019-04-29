// const Model = require('./model');

module.exports = (Model) => {
  class User extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks);
      this.schema = schema;
    }
  }

  const UserModel = new User('User', {
    id: 'integer',
    email: 'String',
    firstName: 'String',
    lastName: 'String',
    password: 'String',
    address: 'String',
    status: 'String',
    isAdmin: 'Boolean',
  }, {});

  UserModel.buildAssociation = (Models) => {
    UserModel.hasMany(Models.Loan);
  };
  return UserModel;
};
