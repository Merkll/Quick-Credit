const Model = require('./model');

class Loan extends Model {
  constructor(modelName, schema, hooks) {
    super(modelName, hooks);
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
