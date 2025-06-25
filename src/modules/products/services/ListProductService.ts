import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { ICacheProvider } from '@shared/providers/cache/models/IRedisProvider';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('cacheProvider')
    private cacheProvider: ICacheProvider
  ) {
    this.productsRepository;
  }
  public async execute(): Promise<IProduct[] | null> {
    let products = await this.cacheProvider.recover<IProduct[]>(
      'api-vendas-PRODUCT_LIST'
    );

    if (!products) {
      products = await this.productsRepository.list();

      if (products) {
        await this.cacheProvider.save('api-vendas-PRODUCT_LIST', products);
      }
    }

    return products;
  }
}

export default ListProductService;
