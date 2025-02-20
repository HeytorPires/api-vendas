import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findByID(id);

    if (!order) {
      throw new AppError('Order not found');
    }
    return order;
  }
}

export default ShowOrderService;
