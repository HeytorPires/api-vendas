import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
  // Verifica se já existe um cliente com o mesmo nome
  public async findAllByIds(
    products: IFindProducts[]
  ): Promise<Product[] | undefined> {
    const productIds = products.map((product) => product.id);

    const existProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });
    return existProducts;
  }
}
