import { IProduct } from '../models/IProduct';
import { IProductCreate } from '../models/IProductCreate';

export interface IFindProducts {
  id: string;
}

export interface IProductsRepository {
  create({ name, price, quantity }: IProductCreate): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  findByName(name: string): Promise<IProduct | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[] | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  list(): Promise<IProduct[] | null>;
}
