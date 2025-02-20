import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middleware/isAuthenticated';

const ordersRouter = Router();
const orderController = new OrderController();

ordersRouter.use(isAuthenticated);
ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderController.show
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required().uuid(),
      products: Joi.required(),
    },
  }),
  orderController.create
);

export default ordersRouter;
