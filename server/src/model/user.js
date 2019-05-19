import bcrypt from 'bcrypt';
import { filterPassword } from '../helpers/util';

export default (Model) => {
  class User extends Model {
    // eslint-disable-next-line no-useless-constructor
    constructor(modelName, schema, hooks) {
      super(modelName, schema, hooks);
    }
  }

  const UserModel = new User('User', {
    id: { type: 'integer', format: 'myId', fieldName: 'Id' },
    createdOn: { type: 'date' },
    updatedOn: { type: 'date' },
    email: { 
      type: 'string', format: 'myEmail', required: true, unique: true, fieldName: 'Email' 
    },
    firstName: { type: 'string', required: true, fieldName: 'First Name' },
    lastName: { type: 'string', required: true, fieldName: 'Last Name' },
    password: { type: 'string', required: true, fieldName: 'Password' },
    address: { type: 'string', required: true, fieldName: 'User Address' },
    status: { type: 'string' },
    isAdmin: { type: 'boolean' },
  }, {
    beforeInsert: (data) => {
      let details = data;
      if (!Array.isArray(details)) details = [details];
      return details.map((detail) => {
        const userDetails = detail;
        const hash = bcrypt.hashSync(userDetails.password, 10);
        userDetails.password = hash;
        userDetails.status = 'unverified';
        userDetails.isAdmin = userDetails.isAdmin || false;
        userDetails.createdOn = new Date();
        return userDetails;
      });
    },
    afterFind: (data, hookData) => (hookData && hookData.auth ? data : filterPassword(data)),
    beforeUpdate: (data) => {
      const details = data;
      details.updatedOn = new Date();
      if (details.password) details.password = bcrypt.hashSync(details.password, 10);
      return details;
    },
  });

  UserModel.buildAssociation = (Models) => {
    UserModel.hasMany(Models.Loan);
    UserModel.hasMany(Models.Message);
  };
  return UserModel;
};
