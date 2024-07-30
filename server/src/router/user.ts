import express from 'express';
import * as userController from '../lib/controller';
import { isUserAuthenticated } from '@lib/middleware/user-login-validator';
import { makeExpressCallBack } from '@lib/middleware/express-callback';

const router = express.Router();

router.get(
  '/all-chat-users',
  isUserAuthenticated,
  makeExpressCallBack(userController.getAllChatUser),
);
router.get(
  '/',
  isUserAuthenticated,
  makeExpressCallBack(userController.getUser),
);
export default router;
