
import { AuthService } from '../services/index';
import { UserExists, AuthenticationError, InvalidRequestBodyError } from '../helpers/error';
import Response from '../helpers/response';

export const signup = async (req, res, next) => {
  const { body } = req;
  const data = await AuthService.Signup(body);
  if (data.error) return next(new UserExists(data.error));
  const response = new Response(data, 201);
  return res.status(201).json(response);
};

export const signin = async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;
  if (!email || !password) return next(new InvalidRequestBodyError('Email and Password required for authentication', 400));
  const data = await AuthService.Signin(body);
  if (data.error) return next(new AuthenticationError(data.error));
  const response = new Response(data, 200);
  return res.status(200).json(response);
};
