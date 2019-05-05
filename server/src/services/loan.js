const { Loan } = require('../model');

exports.getLoan = (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  return Loan.find({ id: loan }).data[0];
};

exports.getCurrentLoans = () => Loan.find({ status: 'approved', repaid: false }).data;
exports.getRepaidLoans = () => Loan.find({ status: 'approved', repaid: true }).data;
exports.getAllLoans = () => Loan.findAll().data;
exports.newLoan = (loanDetails) => {
  if (!loanDetails) throw new Error('Loan details cant be empty');
  if (!Loan.validateSchema(loanDetails)) return { error: 'Invalid Loan Details' };
  const details = Loan.insert(loanDetails).data;
  return details;
};

exports.changeLoanStatus = ({ loan, status }) => {
  if (status !== 'approved' && status !== 'rejected') return { error: 'Status should either be "approved" or "rejected"' };
  return Loan.update({ status }, { id: loan }).data[0];
};
