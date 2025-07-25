import { IProduct } from '@modules/products/domain/models/IProduct';
import { IOrder } from './IOrders';

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
