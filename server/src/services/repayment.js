/* eslint-disable import/named */
import { Loan, Repayment } from '../model';
import { MailEvent } from '../lib/mail';
// eslint-disable-next-line import/no-cycle
import { UserService } from '.'; // code smell check later
import { formatAmount } from '../helpers/util';

export const createRepayment = async (loan, amount) => {
  if (!loan) throw new Error('Loan to query not specified');
  const { data: loanData } = await Loan.find({ id: { eq: loan } });
  const loanDetails = loanData[0];
  const { balance, paymentinstallment } = loanDetails;
  if (amount > balance) return { error: ` Payment Amount in excess of ${formatAmount(amount - balance)}` };
  let repaidAmount = amount;
  if (!amount) repaidAmount = (balance - paymentinstallment >= 0) ? paymentinstallment : balance;
  const repaymentDetails = {
    amount: repaidAmount,
    loanId: loan,
  };
  const { data } = await Repayment.insert(repaymentDetails);
  const loanBalance = balance - repaymentDetails.amount;
  let repaid = false;
  if (loanBalance === 0) repaid = true;
  await Loan.update({ balance: loanBalance, repaid }, { id: { eq: loan } });
  const client = await UserService.getUser(loanDetails.client);
  if (client) {
    MailEvent('loan-repayment', {
      'client-name': client.firstname,
      'loan-id': loanDetails.id,
      to: loanDetails.client,
    });
  }
  return data;
};

export const getLoanRepayments = async (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  const { data } = await Repayment.find({ loanId: { eq: loan } });
  return data;
};
