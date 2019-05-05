const router = require('express').Router();
const v1Route = require('./v1');

router.use('/v1', v1Route);

module.exports = router;
