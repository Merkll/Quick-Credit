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
      type: 'integer', format: 'myId', fieldName: 'Client' 
    },
    createdOn: { type: 'date' },
    updatedOn: { type: 'date' },
  }, {
    beforeInsert: (data) => {
      let details = data;
      if (!Array.isArray(details)) details = [details];
      return details.map((detail) => {
        const authDetails = detail;
        authDetails.createdOn = new Date();
        return authDetails;
      });
    },
  });

  AuthModel.buildAssociation = (Models) => {
    AuthModel.belongsTo(Models.User, { user: 'id' });
  };
  return AuthModel;
};
