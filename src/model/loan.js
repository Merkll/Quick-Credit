const { FieldTypes } = require('../lib/schema-validator');

module.exports = (Model) => {
  class Loan extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
    }
  }

  const LoanModel = new Loan('Loan', {
    id: FieldTypes.Integer,
    user: FieldTypes.String,
    CreatedOn: FieldTypes.Date,
    status: FieldTypes.String,
    repaid: FieldTypes.Boolean,
    tenor: FieldTypes.Integer,
    amount: FieldTypes.Number,
    paymentInstallment: FieldTypes.Number,
    balance: FieldTypes.Number,
    interest: FieldTypes.Number,
  }, {});

  LoanModel.buildAssociation = (Models) => {
    LoanModel.belongsTo(Models.User);
    LoanModel.hasMany(Models.Repayment);
  };
  return LoanModel;
};
