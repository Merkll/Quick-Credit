const router = require('express').Router();
const { MethodNotAllowedError } = require('../../lib/error');
const { signup, signin } = require('./controllers/auth');
const { verify, getUsers, getUser } = require('./controllers/user');
const {
  getLoan,
  getAllLoans,
  applyForLoan,
  loanStatus,
} = require('./controllers/loan');

const { getLoanRepayments, postLoanRepayment } = require('./controllers/repayment');

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

router.route('/users/:email/verify')
  .patch(verify)
  .all(() => {
    throw new MethodNotAllowedError();
  });

router.route('/loans/:loan')
  .get(getLoan)
  .patch(loanStatus)
  .all(() => {
    throw new MethodNotAllowedError();
  });

router.route('/loans/:loan/repayments')
  .get(getLoanRepayments)
  .post(postLoanRepayment)
  .all(() => {
    throw new MethodNotAllowedError();
  });

router.route('/loans')
  .get(getAllLoans)
  .post(applyForLoan)
  .all(() => {
    throw new MethodNotAllowedError();
  });

router.route('/users')
  .get(getUsers)
  .all(() => {
    throw new MethodNotAllowedError();
  });

router.route('/users/:email')
  .get(getUser)
  .all(() => {
    throw new MethodNotAllowedError();
  });

module.exports = router;
