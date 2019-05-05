const { FieldTypes } = require('../lib/schema-validator');

module.exports = (Model) => {
  class Repayment extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
    }
  }

  const RepaymentModel = new Repayment('Repayment', {
    id: FieldTypes.Integer,
    createdOn: FieldTypes.Date,
    loanId: FieldTypes.Integer,
    amount: FieldTypes.Number,
  }, {});

  RepaymentModel.buildAssociation = (Models) => {
    RepaymentModel.belongsTo(Models.Loan);
  };
  return RepaymentModel;
};
