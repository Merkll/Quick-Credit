
import { NotFoundError } from '../../../lib/error';
import { 
  verify as verifyService, getAllUsers, filterUsers, 
  getUser as getUserService, 
} from '../../../services/user';
import Response from '../../../lib/response';

export const verify = (req, res) => {
  const { email } = req.params;
  const data = verifyService(email);
  if (!data) throw new NotFoundError('User with that email address doesnt exist');
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const getUsers = (req, res) => {
  const statusEnums = ['verified', 'unverified'];
  const { status } = req.query;
  let data;
  if (statusEnums.includes(status)) data = filterUsers({ status });
  else data = getAllUsers();
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const getUser = (req, res) => {
  const { email } = req.params;
  const data = getUserService(email);
  if (!data) throw new NotFoundError('User with that email address doesnt exist');
  const response = new Response(data);
  res.status(response.status).json(response);
};
