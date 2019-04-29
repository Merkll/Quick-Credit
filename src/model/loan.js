const Model = require('./model');

class Loan extends Model {
  constructor(modelName, schema, hooks, db) {
    super(modelName, hooks, db);
    this.schema = schema;
  }
}

module.exports = new Loan('Loan', {
  id: 'integer',
  user: 'String',
  CreatedOn: 'DateTine',
  status: 'String',
  repaid: 'Boolean',
  tenor: 'interger',
  amount: 'float',
  paymentInstallment: 'float',
  balance: 'float',
  interest: 'float',
}, {});
