export default (Model) => {
  class Repayment extends Model {
    // eslint-disable-next-line no-useless-constructor
    constructor(modelName, schema, hooks) {
      super(modelName, schema, hooks);
    }
  }
  const RepaymentModel = new Repayment('Repayment', {
    id: { type: 'integer', format: 'myId', fieldName: 'ID' },
    createdOn: { type: 'date' },
    updatedOn: { type: 'date' },
    loanId: { type: 'integer', format: 'myId', fieldName: 'Loan ID' },
    amount: { type: 'number', fieldName: 'Repayment Amount' },
  }, {
    beforeInsert: (data) => {
      let details = data;
      if (!(details instanceof Array)) details = [details];
      return details.map((detail) => {
        const repaymentData = detail;
        repaymentData.createdOn = new Date();
        return repaymentData;
      });
    },
    beforeUpdate: (data) => {
      const details = data;
      details.updatedOn = new Date();
      return details;
    },
  });

  RepaymentModel.buildAssociation = (Models) => {
    RepaymentModel.belongsTo(Models.Loan);
  };
  return RepaymentModel;
};
