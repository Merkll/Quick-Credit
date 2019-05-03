const router = require('express').Router();
const { MethodNotAllowedError } = require('../../lib/error');
const { signup, signin } = require('./controllers/auth');

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

module.exports = router;
