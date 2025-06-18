import { v4 as uuidv4 } from 'uuid';
import { IOrderRepository } from '../IOrderRepository';
import ICreateOrders from '../../models/ICreateOrders';
import Order from '@modules/orders/infra/typeorm/entities/Order';

class FakeOrdersRepository
  implements Omit<IOrderRepository, 'remove' | 'findAll' | 'list' | 'create'>
{
  private Orders: Order[] = [];

  //   public async create({
  //     customer_id,
  //     products,
  //   }: ICreateOrders): Promise<Order> {
  //     const order = new Order();

  //     order.customer.id = customer_id;
  //     order.order_products = products;
  //     Order.email = email;

  //     this.Orders.push(Order);

  //     return Order;
  //   }

  public async save(Order: Order): Promise<Order> {
    const findIndex = this.Orders.findIndex(
      (findOrder) => findOrder.id === Order.id
    );
    this.Orders[findIndex] = Order;

    return Order;
  }
  public async remove(Order: Order): Promise<void> {}

  public async findById(id: string): Promise<Order | undefined> {
    const Order = this.Orders.find((c) => c.id === id);
    return Order;
  }
}

export default FakeOrdersRepository;
