
import { AuthService } from '../services/index';
import { UserExists, AuthenticationError, InvalidRequestBodyError } from '../helpers/error';
import Response from '../helpers/response';

export const signup = (req, res) => {
  const { body } = req;
  const data = AuthService.Signup(body);
  if (data.error) throw new UserExists(data.error);
  const response = new Response(data, 201);
  res.status(201).json(response);
};

export const signin = (req, res) => {
  const { body } = req;
  const { email, password } = body;
  if (!email || !password) throw new InvalidRequestBodyError('Email and Password required for authentication', 400);
  const data = AuthService.Signin(body);
  if (data.error) throw new AuthenticationError(data.error);
  const response = new Response(data, 200);
  res.status(200).json(response);
};
