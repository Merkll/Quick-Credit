export default (Model) => {
  class Loan extends Model {
    // eslint-disable-next-line no-useless-constructor
    constructor(modelName, schema, hooks) {
      super(modelName, schema, hooks);
    }
  }
  const LoanModel = new Loan('Loan', {
    id: { type: 'integer', format: 'myId', fieldName: 'ID' },
    client: { 
      type: 'string', format: 'myEmail', required: true, fieldName: 'Client'
    },
    createdOn: { type: 'string', fieldName: 'Created On', format: 'myDate' },
    updatedOn: { type: 'string', format: 'myDate' },
    status: { type: 'string' },
    repaid: { type: 'boolean' },
    tenor: { type: 'integer', required: true, fieldName: 'Loan Tenor' },
    amount: { type: 'number', required: true, fieldName: 'Loan Amount' },
    paymentInstallment: { type: 'number', fieldName: 'Payment Installment' },
    balance: { type: 'number', fieldName: 'Loan Balance' },
    interest: { type: 'number', fieldName: 'Loan Interest' },
    purpose: { type: 'string', required: true, fieldName: 'Loan Purpose' },
  }, {
    beforeInsert: (data) => {
      let details = data;
      if (!(details instanceof Array)) details = [details];
      return details.map((detail) => {
        const loanData = detail;
        loanData.tenor = parseInt(loanData.tenor, 10) || 1;
        const { amount, tenor } = loanData;
        const interest = amount * 0.05;
        loanData.interest = interest;
        const installment = (amount + interest) / tenor;
        loanData.paymentInstallment = installment;
        loanData.createdOn = new Date();
        loanData.balance = amount + interest;
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
