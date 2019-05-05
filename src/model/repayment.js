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
