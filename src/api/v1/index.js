const router = require('express').Router();
const { MethodNotAllowedError } = require('../../lib/error');
const { signup } = require('./controllers/auth');

router.route('/auth/signup')
  .post(signup)
  .all(() => {
    throw new MethodNotAllowedError();
  });

module.exports = router;
