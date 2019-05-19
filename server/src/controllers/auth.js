
import { AuthService } from '../services/index';
import {
  UserExists, AuthenticationError, InvalidRequestBodyError, HTTPError 
} from '../helpers/error';
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

export const passwordReset = async (req, res) => {
  const { email } = req.params;
  await AuthService.passwordReset(email);
  const response = new Response('Email containing reset instruction has been sent', 200);
  return res.status(response.status).json(response);
};

export const changePassword = async (req, res, next) => {
  const { email } = req.params;
  const { password, token } = req.body;
  const data = await AuthService.changePassword(email, token, password); 
  if (data.error) return next(new HTTPError(data.error, 401));
  const response = new Response(data, 200);
  return res.status(response.status).json(response);
};
