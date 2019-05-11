
import { AuthService } from '../services/index';

import { UserExists, AuthenticationError } from '../helpers/error';
import Response from '../helpers/response';
import { checkRequestBody } from '../helpers/util';

export const signup = (req, res) => {
  const requestBody = checkRequestBody(req.body);
  const data = AuthService.Signup(requestBody);
  if (data.error) throw new UserExists(data.error);
  const response = new Response(data, 201);
  res.status(201).json(response);
};

export const signin = (req, res) => {
  const requestBody = checkRequestBody(req.body);
  const data = AuthService.Signin(requestBody);
  if (data.error) throw new AuthenticationError(data.error);
  const response = new Response(data, 200);
  res.status(200).json(response);
};
