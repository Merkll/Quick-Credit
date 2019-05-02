const bcrypt = require('bcrypt');


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
  }, {
    beforeInsert: (data) => {
      const details = data;
      const hash = bcrypt.hashSync(details.password, 10);
      details.password = hash;
      return details;
    },
  });

  UserModel.buildAssociation = (Models) => {
    UserModel.hasMany(Models.Loan);
    UserModel.hasMany(Models.Message);
  };
  return UserModel;
};
