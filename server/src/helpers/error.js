/**
 * Defines all Major Errors that can be thrown by the request to the application
 *
 */

class ApplicationError extends Error {
  constructor(error, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.error = error;
  }
}

export const ResourceNotFoundError = class extends ApplicationError {
  constructor(message) {
    super(message || 'Resource requested doesnt exist', 404);
  }
};

export const NotFoundError = class extends ApplicationError {
  constructor(message) {
    super(message || 'No Record found matching that criteria', 404);
  }
};

export const UserExists = class extends ApplicationError {
  constructor(message) {
    super(message || 'User with that email already exist', 409);
  }
};

export const AuthenticationError = class extends ApplicationError {
  constructor(message) {
    super(message || 'Could not authenticate you', 401);
  }
};

export const AuthorizationError = class extends ApplicationError {
  constructor(message) {
    super(message || 'You are not authorized to perform that action', 403);
  }
};

export const MethodNotAllowedError = class extends ApplicationError {
  constructor(message) {
    super(message || 'Request Method Not allowed for this resource', 405);
  }
};

export const InvalidRequestBodyError = class extends ApplicationError {
  constructor(message) {
    super(message || 'Invalid Request Body', 422);
  }
};

export const TokenNotProvidedError = class extends ApplicationError {
  constructor(message) {
    super(message || 'Auth token missing', 400);
  }
};

export const InvalidToken = class extends ApplicationError {
  constructor(message) {
    super(message || 'Token Invalid', 403);
  }
};

export const ExpiredToken = class extends ApplicationError {
  constructor(message) {
    super(message || 'User Token expired Login', 403);
  }
};
