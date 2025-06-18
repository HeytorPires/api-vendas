import { Request, Response } from 'express';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';
import { container } from 'tsyringe';

export default class OrderController {
  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrderService);
    const order = await showOrder.execute(id);

    response.json(order);
    return;
  }

  public async create(request: Request, response: Response) {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);
    const Order = await createOrder.execute({ customer_id, products });

    response.status(201).json(Order);
    return;
  }
}
