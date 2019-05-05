// const Model = require('./model');

module.exports = (Model) => {
  class Auth extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
    }
  }

  const AuthModel = new Auth('Auth', {
    token: 'uuid',
    email: 'String',
    user: 'integer',
  }, {});

  AuthModel.buildAssociation = (Models) => {
    AuthModel.belongsTo(Models.User, { user: 'id' });
  };
  return AuthModel;
};
