import { body } from 'express-validator';

export const signInValidator = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const signUpValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('password is required'),
  body('comfirmPassword')
    .notEmpty()
    .withMessage('comfirm password is required')
    .custom((comfirmPassword, { req }) => comfirmPassword == req.body.password),
];

export const forgotPasswordValidator = [
  body('email').notEmpty().withMessage('Email is required'),
];

export const updatePasswordWithOldPasswordValidator = [
  body('oldPassword').notEmpty().withMessage('password is required'),
  body('newPassword').notEmpty().withMessage('new password is required'),
  body('newComfirmPassword')
    .notEmpty()
    .withMessage('comfirm password is required')
    .custom(
      (newComfirmPassword, { req }) =>
        newComfirmPassword == req.body.newPassword,
    ),
];
export const updatePasswordWithTokenValidator = [
  body('token').notEmpty().withMessage('password is required'),
  body('_id').notEmpty().withMessage('password is required'),
  body('newPassword').notEmpty().withMessage('new password is required'),
  body('newComfirmPassword')
    .notEmpty()
    .withMessage('comfirm password is required')
    .custom(
      (newComfirmPassword, { req }) =>
        newComfirmPassword == req.body.newPassword,
    ),
];
