import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {
    this.productsRepository;
  }
  public async execute(): Promise<IProduct[] | null> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<IProduct[]>(
      'api-vendas-PRODUCT_LIST'
    );

    if (!products) {
      products = await this.productsRepository.list();

      if (products) {
        await redisCache.save('api-vendas-PRODUCT_LIST', products);
      }
    }

    return products;
  }
}

export default ListProductService;
