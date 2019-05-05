const { Loan, Repayment } = require('../model');

exports.createRepayment = (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  const loanDetails = Loan.find({ id: loan }).data[0];
  const { balance, paymentInstallment } = loanDetails;
  const repaymentDetails = {
    amount: (balance - paymentInstallment <= 0) ? balance : paymentInstallment,
    loanId: loan,
  };
  return Repayment.insert(repaymentDetails).data;
};

exports.getLoanRepayments = (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  return Repayment.find({ loanId: loan }).data;
};
