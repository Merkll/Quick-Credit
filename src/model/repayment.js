module.exports = (Model) => {
  class Repayment extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks);
      this.schema = schema;
    }
  }

  const RepaymentModel = new Repayment('Repayment', {
    id: 'integer',
    CreatedOn: 'DateTine',
    loanId: 'integer',
    amount: 'float',
  }, {});

  RepaymentModel.buildAssociation = (Models) => {
    RepaymentModel.hasMany(Models.Loan);
  };
  return RepaymentModel;
};
