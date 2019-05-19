import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../docs/quick-credit.json';
import { Authenticate, Authorize } from '../../middleware/auth';
import { MethodNotAllowed } from '../../middleware/error-handler';
import { CheckRequestBody } from '../../middleware/util';

import { 
  LoanController, RepaymentController, UserController, AuthController 
} from '../../controllers/index';

export default (router) => {
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  router.use(Authenticate);

  router.route('/auth/signup')
    .post(CheckRequestBody, AuthController.signup).all(MethodNotAllowed);

  router.route('/auth/signin')
    .post(CheckRequestBody, AuthController.signin).all(MethodNotAllowed);

  router.route('/users/:email/verify')
    .patch(Authorize, UserController.verify).all(MethodNotAllowed);

  router.route('/loans/:loan')
    .get(LoanController.getLoan)
    .patch(Authorize, LoanController.loanStatus)
    .all(MethodNotAllowed);

  router.route('/loans/:loan/repayments')
    .get(RepaymentController.getLoanRepayments)
    .post(Authorize, RepaymentController.postLoanRepayment)
    .all(MethodNotAllowed);

  router.route('/loans')
    .get(LoanController.getAllLoans).post(CheckRequestBody, LoanController.applyForLoan).all(MethodNotAllowed);

  router.route('/users').get(Authorize, UserController.getUsers).all(MethodNotAllowed);

  router.route('/users/:email')
    .get(UserController.getUser)
    .all(MethodNotAllowed);

  return router;
};
