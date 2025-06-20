// import { IOrderProducts } from '@modules/orders/infra/domain/models/IOrdersProducts';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
