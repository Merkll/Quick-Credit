const bcrypt = require('bcrypt');


module.exports = (Model) => {
  class User extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
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
      let details = data;
      if (!(details instanceof Array)) details = [details];
      return details.map((detail) => {
        const userDetails = detail;
        const hash = bcrypt.hashSync(userDetails.password, 10);
        userDetails.password = hash;
        userDetails.status = 'unverified';
        userDetails.isAdmin = false;
        return userDetails;
      });
    },
  });

  UserModel.buildAssociation = (Models) => {
    UserModel.hasMany(Models.Loan);
    UserModel.hasMany(Models.Message);
  };
  return UserModel;
};
