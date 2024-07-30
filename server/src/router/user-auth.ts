import express from 'express';
import * as authController from '../lib/controller';
import * as authValidator from '../lib/validator/auth';
import { isUserAuthenticated } from '@lib/middleware/user-login-validator';
import { makeExpressCallBack } from '@lib/middleware/express-callback';

const router = express.Router();

router.post(
  '/sign-in',
  authValidator.signInValidator,
  makeExpressCallBack(authController.postSignIn),
);
router.post(
  '/sign-up',
  authValidator.signUpValidator,
  makeExpressCallBack(authController.postSignUp),
);

router.post(
  '/login-with-google',
  makeExpressCallBack(authController.loginWithGoogle),
);

export default router;
