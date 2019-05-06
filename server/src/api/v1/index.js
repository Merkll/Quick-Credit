import { Router } from 'express';
import { MethodNotAllowedError } from '../../lib/error';
import { signup, signin } from './controllers/auth';
import { verify, getUsers, getUser } from './controllers/user';
import { 
  getLoan, getAllLoans, applyForLoan, loanStatus, 
} from './controllers/loan';
import { getLoanRepayments, postLoanRepayment } from './controllers/repayment';

const router = Router();


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

export default router;
