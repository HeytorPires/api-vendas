import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IOrder } from '../models/IOrders';
import { ICreateOrderProducts } from '../models/ICreateOrderProducts';

interface IRequest {
  customer: ICustomer;
  products: ICreateOrderProducts[];
}
export interface IOrderRepository {
  //   findByEmail(email: string): Promise<IOrder | undefined>;
  findById(id: string): Promise<IOrder | undefined>;
  list(): Promise<IOrder[] | undefined>;
  create({ customer, products }: IRequest): Promise<IOrder>;
  save(customer: IOrder): Promise<IOrder>;
  remove(customer: IOrder): Promise<void>;
}
