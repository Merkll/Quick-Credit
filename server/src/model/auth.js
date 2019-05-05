const { FieldTypes } = require('../lib/schema-validator');

module.exports = (Model) => {
  class Auth extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
    }
  }

  const AuthModel = new Auth('Auth', {
    token: FieldTypes.String,
    email: FieldTypes.String,
    user: FieldTypes.Integer,
  }, {});

  AuthModel.buildAssociation = (Models) => {
    AuthModel.belongsTo(Models.User, { user: 'id' });
  };
  return AuthModel;
};
