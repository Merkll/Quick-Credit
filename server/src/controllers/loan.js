import { LoanService, UserService } from '../services/index';

import { InvalidRequestBodyError, NotFoundError, AuthorizationError } from '../helpers/error';
import Response from '../helpers/response';

const isLoanExist = (loanData, next) => {
  if ((Array.isArray(loanData) && loanData.length === 0) || (!loanData)) return next(new NotFoundError('loan with that id not found'));
  return loanData;
};

export const getLoan = async (req, res, next) => {
  const { loan } = req.params;
  const { email, isAdmin } = req.user;
  const loanData = await LoanService.getLoan(loan);
  const data = isLoanExist(loanData, next);
  if (!data) return null;
  // throws error if loan doesnt belong to user and user isnt an admin
  if (email !== data.client && !isAdmin) return next(new AuthorizationError('You are not authorized to view that loan'));
  const response = new Response(data);
  return res.status(response.status).json(response);
};

export const getAllLoans = async (req, res) => {
  const { status, repaid } = req.query;
  const { email, isAdmin } = req.user;
  let user = {};
  if (!isAdmin) user = { email };
  // makes it such that it query loans based on the user authorization
  let data;
  if (status === 'approved' && repaid === 'false') data = await LoanService.getCurrentLoans(user);
  else if (status === 'approved' && repaid === 'true') data = await LoanService.getRepaidLoans(user);
  else data = await LoanService.getAllLoans(user);
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const applyForLoan = async (req, res, next) => {
  const { email } = req.user;
  if (!UserService.isUserVerified) return next(new AuthorizationError('Your account isnt verified'));
  const requestBody = { ...req.body, client: email };
  const data = await LoanService.newLoan(requestBody, email);
  if (data.error) return next(new InvalidRequestBodyError(data.error));
  // verified users should apply for loan
  const response = new Response(data, 201);
  return res.status(response.status).json(response);
};

export const loanStatus = async (req, res, next) => {
  const { status } = req.body;
  const { loan } = req.params;
  if (!(status === 'approved' || status === 'rejected')) return next(new InvalidRequestBodyError('Invalid request Body'));
  const loanDetails = await LoanService.changeLoanStatus({ loan, status });
  const data = isLoanExist(loanDetails, next);
  if (data.error) return next(new InvalidRequestBodyError(data.error));
  if (data) {
    const response = new Response(data, 200);
    return res.status(response.status).json(response);
  }
  return next();
};
