import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      token: Joi.string().uuid().required(),
    },
  }),
  //   isAuthenticated,
  resetPasswordController.Reset
);

export default passwordRouter;
