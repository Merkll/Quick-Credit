import { UserService } from '../services/index';
import Response from '../helpers/response';
import { checkUserData } from '../helpers/util';

export const verify = (req, res) => {
  const { email } = req.params;
  const data = checkUserData(UserService.verify(email));
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
  const data = checkUserData(UserService.getUser(email));
  const response = new Response(data);
  res.status(response.status).json(response);
};
