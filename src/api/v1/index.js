const router = require('express').Router();
const { MethodNotAllowedError } = require('../../lib/error');
const { signup, signin } = require('./controllers/auth');
const { verify } = require('./controllers/user');

router.route('/auth/signup')
  .post(signup)
  .all(() => {
    throw new MethodNotAllowedError();
  });

router.route('/auth/signin')
  .post(signin)
  .all(() => {
    throw new MethodNotAllowedError();
  });

router.route('/user/:email/verify')
  .patch(verify)
  .all(() => {
    throw new MethodNotAllowedError();
  });

module.exports = router;
