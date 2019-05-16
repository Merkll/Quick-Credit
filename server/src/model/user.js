import bcrypt from 'bcrypt';

const filterPassword = userData => Object.keys(userData).reduce((object, key) => {
  // eslint-disable-next-line no-param-reassign
  if (key !== 'password') object[key] = userData[key];
  return object;
}, {});

export default (Model) => {
  class User extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
    }
  }

  const UserModel = new User('User', {
    id: { type: 'integer', format: 'id' },
    createdOn: { type: 'date' },
    email: { 
      type: 'string', format: 'email', required: true, unique: true, 
    },
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    password: { type: 'string', required: true },
    address: { type: 'string', required: true },
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
    afterInsert: data => ((!(data instanceof Array)) ? filterPassword(data) 
      : data.map(detail => filterPassword(detail))),
    afterFind: data => ((!(data instanceof Array)) ? filterPassword(data) 
      : data.map(detail => filterPassword(detail))),
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
