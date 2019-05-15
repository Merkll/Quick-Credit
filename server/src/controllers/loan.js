import { LoanService, UserService } from '../services/index';

import { InvalidRequestBodyError, NotFoundError, AuthorizationError } from '../helpers/error';
import Response from '../helpers/response';
import { checkRequestBody } from '../helpers/util';

const isLoanExist = (loanData) => {
  if (!loanData) throw new NotFoundError('loan with that id not found');
  return loanData;
};

export const getLoan = (req, res) => {
  const { loan } = req.params;
  const { email, isAdmin } = req.user;
  const data = isLoanExist(LoanService.getLoan(loan));
  // throws error if loan doesnt belong to user and user isnt an admin
  if (email !== data.user && !isAdmin) throw new AuthorizationError('You are not authorized to view that loan');
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const getAllLoans = (req, res) => {
  const { status, repaid } = req.query;
  const { email, isAdmin } = req.user;
  let user = {};
  if (!isAdmin) user = { email };
  // makes it such that it query loans based on the user authorization
  let data;
  if (status === 'approved' && repaid === 'false') data = LoanService.getCurrentLoans(user);
  else if (status === 'approved' && repaid === 'true') data = LoanService.getRepaidLoans(user);
  else data = LoanService.getAllLoans(user);
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const applyForLoan = (req, res) => {
  const { email } = req.user;
  if (!UserService.isUserVerified) throw new AuthorizationError('Your account isnt verified');
  const requestBody = { ...checkRequestBody(req.body), user: email };
  const data = LoanService.newLoan(requestBody, email);
  // verified users should apply for loan
  const response = new Response(data, 201);
  res.status(response.status).json(response);
};

export const loanStatus = (req, res) => {
  const { status } = req.body;
  const { loan } = req.params;
  if (!(status === 'approved' || status === 'rejected')) throw new InvalidRequestBodyError('Invalid request Body');
  const data = isLoanExist(LoanService.changeLoanStatus({ loan, status }));
  const response = new Response(data, 200);
  res.status(response.status).json(response);
};
