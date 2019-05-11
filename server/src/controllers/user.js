import { UserService } from '../services/index';
import Response from '../helpers/response';
import { NotFoundError, AuthorizationError } from '../helpers/error';

const isUserExist = (userData) => {
  if (!userData) throw new NotFoundError('User with that email address doesnt exist');
  return userData;
};

export const verify = (req, res) => {
  const { email } = req.params;
  const user = UserService.verify(email);
  isUserExist(user);
  const response = new Response(user);
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
  const { email: userEmail, isAdmin } = req.user;
  const user = UserService.getUser(email);
  if (email !== userEmail && !isAdmin) throw new AuthorizationError();
  isUserExist(user);
  const response = new Response(user);
  res.status(response.status).json(response);
};
