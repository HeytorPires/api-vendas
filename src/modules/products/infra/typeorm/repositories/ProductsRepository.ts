import { Repository, getRepository, In } from 'typeorm';
import Product from '../entities/Product';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProductCreate } from '@modules/products/domain/models/IProductCreate';
import { IProduct } from '@modules/products/domain/models/IProduct';

interface IFindProducts {
  id: string;
}

class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;
  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: IProductCreate): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ where: { name } });

    return product;
  }
  public async findById(id: string): Promise<Product | undefined> {
    const customer = await this.ormRepository.findOne({ where: { id } });
    return customer;
  }
  public async list(): Promise<Product[] | null> {
    const user = await this.ormRepository.find();
    return user;
  }

  public async findAllByIds(
    products: IFindProducts[]
  ): Promise<IProduct[] | undefined> {
    const productIds = products.map((product) => product.id);

    const existProducts = await this.ormRepository.find({
      where: { id: In(productIds) },
    });

    return existProducts;
  }
}

export default ProductRepository;
