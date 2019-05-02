const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.send('Hello World from API v1');
  });

module.exports = router;