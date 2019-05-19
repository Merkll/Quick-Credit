import { UserService } from '../services/index';
import Response from '../helpers/response';
import { NotFoundError, AuthorizationError } from '../helpers/error';

const isUserExist = (userData, next) => {
  if (!userData) next(new NotFoundError('User with that email address doesnt exist'));
  return userData;
};

export const verify = async (req, res, next) => {
  const { email } = req.params;
  const user = await UserService.verify(email);
  if (isUserExist(user, next)) {
    const response = new Response(user);
    res.status(response.status).json(response);
  }
};

export const getUsers = async (req, res) => {
  const statusEnums = ['verified', 'unverified'];
  const { status } = req.query;
  let data;
  if (statusEnums.includes(status)) data = await UserService.filterUsers(status);
  else data = await UserService.getAllUsers();
  const response = new Response(data);
  res.status(response.status).json(response);
};

export const getUser = async (req, res, next) => {
  const { email } = req.params;
  const { email: userEmail, isAdmin } = req.user;
  const user = await UserService.getUser(email);
  if (email !== userEmail && !isAdmin) throw new AuthorizationError();
  if (isUserExist(user, next)) {
    const response = new Response(user);
    res.status(response.status).json(response);
  }
};
