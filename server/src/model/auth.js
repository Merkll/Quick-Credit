/* eslint-disable no-useless-constructor */
export default (Model) => {
  class Auth extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, schema, hooks);
    }
  }

  const AuthModel = new Auth('Auth', {
    id: { type: 'integer', format: 'myId', fieldName: 'ID' },
    token: { type: 'string', required: true, fieldName: 'token' },
    email: { 
      type: 'string', required: true, unique: true, fieldName: 'User Email' 
    },
    client: { 
      type: 'integer', format: 'myId', unique: true, fieldName: 'Client' 
    },
    createdOn: { type: 'date' },
    updatedOn: { type: 'date' },
  }, {});

  AuthModel.buildAssociation = (Models) => {
    AuthModel.belongsTo(Models.User, { user: 'id' });
  };
  return AuthModel;
};
