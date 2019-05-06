import { NotFoundError, InvalidRequestBodyError } from '../../../lib/error';
import { 
  getLoan as getLoanService, getAllLoans as getAllLoansService, 
  getCurrentLoans, getRepaidLoans, newLoan, changeLoanStatus, 
} from '../../../services/loan';
import Response from '../../../lib/response';

export const getLoan = (req, res) => {
  const { loan } = req.params;
  const data = getLoanService(loan);
  if (!data) throw new NotFoundError('loan with that id not found');
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const getAllLoans = (req, res) => {
  const { status, repaid } = req.query;
  let data;
  if (status === 'approved' && repaid === 'false') data = getCurrentLoans();
  else if (status === 'approved' && repaid === 'true') data = getRepaidLoans();
  else data = getAllLoansService();
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const applyForLoan = (req, res) => {
  const requestBody = req.body;
  if (!requestBody || Object.keys(requestBody).length === 0) {
    throw new InvalidRequestBodyError('Post Body required');
  }
  const data = newLoan(requestBody);
  const response = new Response(data, 201);
  res.status(response.status).json(response);
};

export const loanStatus = (req, res) => {
  const { status } = req.body;
  const { loan } = req.params;
  if (!(status === 'approved' || status === 'rejected')) throw new InvalidRequestBodyError('Invalid request Body');
  const data = changeLoanStatus({ loan, status });
  if (!data) throw new NotFoundError('loan with that id not found');
  const response = new Response(data, 200);
  res.status(response.status).json(response);
};
