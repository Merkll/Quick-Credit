const router = require('express').Router();
const { MethodNotAllowedError } = require('../../lib/error');

router.route('/auth/signup')
  .post((req, res) => {
    res.send('Hello World from API v1');
  })
  .all(() => {
    throw new MethodNotAllowedError();
  });

module.exports = router;
