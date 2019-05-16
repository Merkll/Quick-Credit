import { 
  LoanService, RepaymentService
} from '../services/index';
import { NotFoundError, AuthorizationError } from '../helpers/error';
import Response from '../helpers/response';

export const getLoanRepayments = (req, res) => {
  const { loan } = req.params;
  const { email, isAdmin } = req.user;
  const loanDetails = LoanService.getLoan(loan);
  const data = RepaymentService.getLoanRepayments(loan);
  if (data.length === 0) throw new NotFoundError('No repayment for that loan found');
  // throws error if loan doesnt belong to user and user isnt an admin
  if (email !== loanDetails.user && !isAdmin) throw new AuthorizationError('You are not authorized to view that repayment');
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const postLoanRepayment = (req, res) => {
  const { loan } = req.params;
  const loanDetails = LoanService.getLoan(loan);
  if (!loanDetails) throw new NotFoundError('loan with that id not found');
  const data = RepaymentService.createRepayment(loan);
  const response = new Response(data, 201);
  res.status(response.status).json(response);
};
