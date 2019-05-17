/* eslint-disable import/named */
import { Loan, Repayment } from '../model';

export const createRepayment = async (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  const { data: loanData } = await Loan.find({ id: { eq: loan } });
  const loanDetails = loanData[0];
  const { balance, paymentInstallment } = loanDetails;
  const repaymentDetails = {
    amount: (balance - paymentInstallment >= 0) ? paymentInstallment : balance,
    loanId: loan,
  };
  const { data } = await Repayment.insert(repaymentDetails);
  const loanBalance = balance - repaymentDetails.amount;
  let repaid = false;
  if (loanBalance === 0) repaid = true;
  await Loan.update({ balance: loanBalance, repaid }, { id: { eq: loan } });
  return data;
};

export const getLoanRepayments = async (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  const { data } = await Repayment.find({ loanId: { eq: loan } });
  return data;
};
