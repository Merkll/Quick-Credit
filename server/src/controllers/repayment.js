import { 
  LoanService, RepaymentService
} from '../services/index';
import { NotFoundError, AuthorizationError, InvalidRequestBodyError } from '../helpers/error';
import Response from '../helpers/response';

export const getLoanRepayments = async (req, res, next) => {
  const { loan } = req.params;
  const { email, isAdmin } = req.user;
  const loanDetails = await LoanService.getLoan(loan);
  const data = await RepaymentService.getLoanRepayments(loan);
  if (data.length === 0) return next(new NotFoundError('No repayment for that loan found'));
  // throws error if loan doesnt belong to user and user isnt an admin
  if (email !== loanDetails.user && !isAdmin) return next(new AuthorizationError('You are not authorized to view that repayment'));
  const response = new Response(data);
  return res.status(response.status).json(response);
};

export const postLoanRepayment = async (req, res, next) => {
  const { loan } = req.params;
  const { amount } = req.body;
  const loanDetails = await LoanService.getLoan(loan);
  if (!loanDetails || loanDetails.length === 0) return next(new NotFoundError('loan with that id not found'));
  const data = await RepaymentService.createRepayment(loan, amount);
  if (data.error) return next(new InvalidRequestBodyError(data.error));
  const response = new Response(data, 201);
  return res.status(response.status).json(response);
};
