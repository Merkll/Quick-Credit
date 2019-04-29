const Model = require('./model');

class User extends Model {
  constructor(modelName, schema, hooks, db) {
    super(modelName, hooks, db);
    this.schema = schema;
  }
}

module.exports = new User('User', {
  id: 'integer',
  email: 'String',
  firstName: 'String',
  lastName: 'String',
  password: 'String',
  address: 'String',
  status: 'String',
  isAdmin: 'Boolean',
}, {});
