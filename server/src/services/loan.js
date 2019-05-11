/* eslint-disable import/named */
import { Loan } from '../model';

export const getLoan = (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  return Loan.find({ id: loan }).data[0];
};

export const getCurrentLoans = (user = {}) => Loan.find({ status: 'approved', repaid: false, ...user }).data;
export const getRepaidLoans = (user = {}) => Loan.find({ status: 'approved', repaid: true, ...user }).data;
// eslint-disable-next-line max-len
export const getAllLoans = (user = {}) => ((user === {}) ? Loan.findAll().data : Loan.find(user).data);

export const newLoan = (loanDetails) => {
  if (!loanDetails) throw new Error('Loan details cant be empty');
  if (!Loan.validateSchema(loanDetails)) return { error: 'Invalid Loan Details' };
  const details = Loan.insert(loanDetails).data;
  return details;
};

export const changeLoanStatus = ({ loan, status }) => {
  if (status !== 'approved' && status !== 'rejected') return { error: 'Status should either be "approved" or "rejected"' };
  return Loan.update({ status }, { id: loan }).data[0];
};
