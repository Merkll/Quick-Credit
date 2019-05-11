import { LoanService } from '../services/index';

import { InvalidRequestBodyError } from '../helpers/error';
import Response from '../helpers/response';
import { checkLoanData, checkRequestBody } from '../helpers/util';


export const getLoan = (req, res) => {
  const { loan } = req.params;
  const data = checkLoanData(LoanService.getLoan(loan));
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
  const requestBody = checkRequestBody(req.body);
  const data = LoanService.newLoan(requestBody);
  const response = new Response(data, 201);
  res.status(response.status).json(response);
};

export const loanStatus = (req, res) => {
  const { status } = req.body;
  const { loan } = req.params;
  if (!(status === 'approved' || status === 'rejected')) throw new InvalidRequestBodyError('Invalid request Body');
  const data = checkLoanData(LoanService.changeLoanStatus({ loan, status }));
  const response = new Response(data, 200);
  res.status(response.status).json(response);
};
