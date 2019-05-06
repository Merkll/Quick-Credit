import { NotFoundError } from '../../../lib/error';
import { getLoanRepayments as getLoanRepaymentsService, createRepayment } from '../../../services/repayment';
import { getLoan } from '../../../services/loan';
import Response from '../../../lib/response';

export const getLoanRepayments = (req, res) => {
  const { loan } = req.params;
  const data = getLoanRepaymentsService(loan);
  if (data.length === 0) throw new NotFoundError('No repayment for that loan found');
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const postLoanRepayment = (req, res) => {
  const { loan } = req.params;
  const loanDetails = getLoan(loan);
  if (!loanDetails) throw new NotFoundError('loan with that id not found');
  const data = createRepayment(loan);
  const response = new Response(data);
  res.status(response.status).json(response);
};
