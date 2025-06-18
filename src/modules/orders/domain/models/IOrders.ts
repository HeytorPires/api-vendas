import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IOrderProducts } from './IOrdersProducts';

export interface IOrder {
  id: string;
  customer: ICustomer;
  order_products: IOrderProducts[];
  created_at: Date;
  updated_at: Date;
}
