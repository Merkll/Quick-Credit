module.exports = (Model) => {
  class Loan extends Model {
    constructor(modelName, schema, hooks) {
      super(modelName, hooks, schema);
    }
  }

  const LoanModel = new Loan('Loan', {
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

  LoanModel.buildAssociation = (Models) => {
    LoanModel.belongsTo(Models.User);
    LoanModel.hasMany(Models.Repayment);
  };
  return LoanModel;
};
