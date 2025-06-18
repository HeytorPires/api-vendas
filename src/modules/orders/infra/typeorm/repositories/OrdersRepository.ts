import { EntityRepository, getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { IOrder } from '@modules/orders/domain/models/IOrders';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}
export class OrdersRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;
  constructor() {
    this.ormRepository = getRepository(Order);
  }
  public async save(order: IOrder): Promise<Order> {
    await this.ormRepository.save(order);

    return order;
  }
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });
    return order;
  }
  public async create({ customer, products }: IRequest): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products.map((product) => ({
        price: product.price,
        quantity: product.quantity,
      })),
    });

    await this.ormRepository.save(order);
    return order;
  }
  public async remove(order: Order): Promise<void> {
    await this.ormRepository.remove(order);
  }

  public async list(): Promise<Order[] | undefined> {
    const order = await this.ormRepository.find();
    return order;
  }
  //   public async findByName(name: string): Promise<Order | undefined> {
  //     const order = await this.ormRepository.findOne({ where: { name } });
  //     return order;
  //   }

  //   public async findById(id: string): Promise<Order | undefined> {
  //     const order = await this.ormRepository.findOne({ where: { id } });
  //     return order;
  //   }

  //   public async findByEmail(email: string): Promise<Order | undefined> {
  //     const order = await this.ormRepository.findOne({ where: { email } });
  //     return order;
  //   }
}
