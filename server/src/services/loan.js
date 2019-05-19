/* eslint-disable import/named */
import { Loan } from '../model';
// eslint-disable-next-line import/no-cycle
import { UserService } from '.'; // code smell check later
import { MailEvent } from '../lib/mail';

export const getLoan = async (loan) => {
  if (!loan) throw new Error('Loan to query not specified');
  const { data } = await Loan.find({ id: { eq: loan } });
  return data[0];
};

export const getCurrentLoans = async (user = {}) => {
  const loanSeacrh = [{ repaid: { eq: false } }];
  const { email } = user;
  if (email) {
    loanSeacrh.push({ client: { eq: email } });
  }
  const { data } = await Loan.find({ status: { eq: 'approved' }, and: loanSeacrh });
  return data;
};
export const getRepaidLoans = async (user = {}) => {
  const loanSeacrh = [{ repaid: { eq: true } }];
  const { email } = user;
  if (email) {
    loanSeacrh.push({ client: { eq: email } });
  }
  const { data } = await Loan.find({ status: { eq: 'approved' }, and: loanSeacrh });
  return data;
};
// eslint-disable-next-line max-len
export const getAllLoans = async (user = {}) => {
  const { email } = user;
  let loanData;
  if (!email) {
    const { data } = await Loan.findAll();
    loanData = data;
  } else {
    const { data } = await Loan.find({ client: { eq: email } });
    loanData = data;
  }
  return loanData;
}; 

export const newLoan = async (loanDetails) => {
  if (!loanDetails) throw new Error('Loan details cant be empty');
  // if (!Loan.validateSchema(loanDetails)) return { error: 'Invalid Loan Details' };
  const { data } = await Loan.insert(loanDetails);
  return data;
};

export const changeLoanStatus = async ({ loan, status }) => {
  const mailActions = { approved: 'loan-approval', rejected: 'loan-rejection' };
  if (status !== 'approved' && status !== 'rejected') return { error: 'Status should either be "approved" or "rejected"' };
  const { data } = await Loan.update({ status }, { id: { eq: loan } });
  if (data && data[0]) {
    const loanDetails = data[0];
    const client = await UserService.getUser(data[0].client);  
    if (client) {
      MailEvent(mailActions[status], {
        'client-name': client.firstname,
        'loan-id': loanDetails.id,
        to: loanDetails.client,
      });
    }
  }
  return data;
};
