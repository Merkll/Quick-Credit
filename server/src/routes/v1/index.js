import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../docs/quick-credit.json';
import { MethodNotAllowedError } from '../../helpers/error';
import { Authenticate } from '../../middleware/auth';
import { 
  LoanController, RepaymentController, UserController, AuthController 
} from '../../controllers/index';

export default (router) => {
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  router.use(Authenticate);

  router.route('/auth/signup')
    .post(AuthController.signup).all(() => { 
      throw new MethodNotAllowedError();
    });

  router.route('/auth/signin')
    .post(AuthController.signin).all(() => {
      throw new MethodNotAllowedError();
    });

  router.route('/users/:email/verify')
    .patch(UserController.verify).all(() => {
      throw new MethodNotAllowedError();
    });

  router.route('/loans/:loan')
    .get(LoanController.getLoan)
    .patch(LoanController.loanStatus)
    .all(() => {
      throw new MethodNotAllowedError();
    });

  router.route('/loans/:loan/repayments')
    .get(RepaymentController.getLoanRepayments)
    .post(RepaymentController.postLoanRepayment)
    .all(() => {
      throw new MethodNotAllowedError();
    });

  router.route('/loans')
    .get(LoanController.getAllLoans).post(LoanController.applyForLoan).all(() => {
      throw new MethodNotAllowedError();
    });

  router.route('/users').get(UserController.getUsers).all(() => {
    throw new MethodNotAllowedError();
  });

  router.route('/users/:email')
    .get(UserController.getUser)
    .all(() => {
      throw new MethodNotAllowedError();
    });

  return router;
};
