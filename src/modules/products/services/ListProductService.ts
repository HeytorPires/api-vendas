import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import { inject } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {
    this.productsRepository;
  }
  public async execute(): Promise<Product[] | null> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST'
    );

    if (!products) {
      products = await this.productsRepository.list();

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
