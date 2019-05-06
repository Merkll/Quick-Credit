import { Loan, Repayment } from '../model';

export const createRepayment = (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  const loanDetails = Loan.find({ id: loan }).data[0];
  const { balance, paymentInstallment } = loanDetails;
  const repaymentDetails = {
    amount: (balance - paymentInstallment <= 0) ? balance : paymentInstallment,
    loanId: loan,
  };
  const { data } = Repayment.insert(repaymentDetails);
  const loanBalance = balance - repaymentDetails.amount;
  let repaid = false;
  if (loanBalance === 0) repaid = true;
  Loan.update({ balance: loanBalance, repaid }, { id: loan });
  return data;
};

export const getLoanRepayments = (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  return Repayment.find({ loanId: loan }).data;
};
