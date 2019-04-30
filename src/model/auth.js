// const Model = require('./model');

module.exports = (Model) => {
  class Auth extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks);
      this.schema = schema;
    }
  }

  const AuthModel = new Auth('Auth', {
    token: 'uuid',
    email: 'String',
    userId: 'integer',
  }, {});

  AuthModel.buildAssociation = (Models) => {
    AuthModel.belongsTo(Models.User, { email: 'email' });
  };
  return AuthModel;
};
