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
    purpose: FieldTypes.String,
  }, {
    beforeInsert: (data) => {
      let details = data;
      if (!(details instanceof Array)) details = [details];
      return details.map((detail) => {
        const loanData = detail;
        const interest = loanData.amount * 0.05;
        loanData.interest = parseFloat(interest.toFixed(2));
        const installment = (loanData.amount + loanData.interest) / loanData.tenor;
        loanData.paymentInstallment = parseFloat(installment.toFixed(2));
        loanData.createdOn = new Date();
        loanData.balance = loanData.amount + loanData.interest;
        return loanData;
      });
    },
    beforeUpdate: (data) => {
      const details = data;
      details.updatedOn = new Date();
      return details;
    },
  });

  LoanModel.buildAssociation = (Models) => {
    LoanModel.belongsTo(Models.User);
    LoanModel.hasMany(Models.Repayment);
  };
  return LoanModel;
};
