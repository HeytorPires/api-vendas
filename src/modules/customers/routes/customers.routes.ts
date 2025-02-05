import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';
import { celebrate, Joi, Segments } from 'celebrate';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get('/', customerController.index);

customerRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  customerController.show
);

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
  }),
  customerController.create
);

customerRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
  }),
  customerController.update
);

customerRouter.delete('/:id', customerController.delete);

export default customerRouter;
