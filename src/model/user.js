const bcrypt = require('bcrypt');
const { FieldTypes } = require('../lib/schema-validator');


module.exports = (Model) => {
  class User extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
    }
  }

  const UserModel = new User('User', {
    id: FieldTypes.Integer,
    email: FieldTypes.String,
    firstName: FieldTypes.String,
    lastName: FieldTypes.String,
    password: FieldTypes.String,
    address: FieldTypes.String,
    status: FieldTypes.String,
    isAdmin: FieldTypes.Boolean,
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
