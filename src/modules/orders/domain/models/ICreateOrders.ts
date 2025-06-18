import { ICreateOrderProducts } from './ICreateOrderProducts';

export default interface ICreateOrders {
  customer_id: string;
  products: ICreateOrderProducts[];
}
