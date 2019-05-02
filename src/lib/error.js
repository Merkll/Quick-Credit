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

exports.ResourceNotFoundError = class extends ApplicationError {
  constructor(message) {
    super(message || 'Resource requested doesnt exist', 404);
  }
};
exports.NotFoundError = class extends ApplicationError {
  constructor(message) {
    super(message || 'No Record found matching that criteria', 404);
  }
};

exports.UserExists = class extends ApplicationError {
  constructor(message) {
    super(message || 'User with that email already exist', 400);
  }
};

exports.AuthenticationError = class extends ApplicationError {
  constructor(message) {
    super(message || 'Could not authenticate you', 401);
  }
};

exports.AuthorizationError = class extends ApplicationError {
  constructor(message) {
    super(message || 'You are not authorized to perform that action', 403);
  }
};

exports.MethodNotAllowedError = class extends ApplicationError {
  constructor(message) {
    super(message || 'Request Method Not allowed for this resource', 405);
  }
};
