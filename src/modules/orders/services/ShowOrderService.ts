import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private orderRepository: OrdersRepository
  ) {
    this.orderRepository;
  }
  public async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }
    return order;
  }
}

export default ShowOrderService;
