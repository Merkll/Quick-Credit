const Model = require('./model');

class Repayment extends Model {
  constructor(modelName, schema, hooks) {
    super(modelName, hooks);
    this.schema = schema;
  }
}

module.exports = new Repayment('Repayment', {
  id: 'integer',
  CreatedOn: 'DateTine',
  loanId: 'integer',
  amount: 'float',
}, {});
