import { Request, Response } from 'express';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';

export default class OrderController {
  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showOrder = new ShowOrderService();
    const order = await showOrder.execute({ id });

    response.json(order); // Retorna o produto encontrado
    return;
  }

  public async create(request: Request, response: Response) {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();
    const Order = await createOrder.execute({ customer_id, products });

    response.status(201).json(Order);
    return;
  }
}
