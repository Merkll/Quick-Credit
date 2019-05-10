import { UserService } from '../services/index';
import { NotFoundError } from '../helpers/error';
import Response from '../helpers/response';

export const verify = (req, res) => {
  const { email } = req.params;
  const data = UserService.verify(email);
  if (!data) throw new NotFoundError('User with that email address doesnt exist');
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const getUsers = (req, res) => {
  const statusEnums = ['verified', 'unverified'];
  const { status } = req.query;
  let data;
  if (statusEnums.includes(status)) data = UserService.filterUsers({ status });
  else data = UserService.getAllUsers();
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const getUser = (req, res) => {
  const { email } = req.params;
  const data = UserService.getUser(email);
  if (!data) throw new NotFoundError('User with that email address doesnt exist');
  const response = new Response(data);
  res.status(response.status).json(response);
};
