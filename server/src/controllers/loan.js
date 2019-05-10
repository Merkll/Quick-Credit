import { LoanService } from '../services/index';

import { NotFoundError, InvalidRequestBodyError } from '../helpers/error';
import Response from '../helpers/response';

export const getLoan = (req, res) => {
  const { loan } = req.params;
  const data = LoanService.getLoan(loan);
  if (!data) throw new NotFoundError('loan with that id not found');
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const getAllLoans = (req, res) => {
  const { status, repaid } = req.query;
  let data;
  if (status === 'approved' && repaid === 'false') data = LoanService.getCurrentLoans();
  else if (status === 'approved' && repaid === 'true') data = LoanService.getRepaidLoans();
  else data = LoanService.getAllLoans();
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const applyForLoan = (req, res) => {
  const requestBody = req.body;
  if (!requestBody || Object.keys(requestBody).length === 0) {
    throw new InvalidRequestBodyError('Post Body required');
  }
  const data = LoanService.newLoan(requestBody);
  const response = new Response(data, 201);
  res.status(response.status).json(response);
};

export const loanStatus = (req, res) => {
  const { status } = req.body;
  const { loan } = req.params;
  if (!(status === 'approved' || status === 'rejected')) throw new InvalidRequestBodyError('Invalid request Body');
  const data = LoanService.changeLoanStatus({ loan, status });
  if (!data) throw new NotFoundError('loan with that id not found');
  const response = new Response(data, 200);
  res.status(response.status).json(response);
};
