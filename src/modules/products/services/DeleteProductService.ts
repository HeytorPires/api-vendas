import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ICacheProvider } from '@shared/providers/cache/models/IRedisProvider';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('cacheProvider')
    private cacheProvider: ICacheProvider
  ) {
    this.productsRepository;
  }
  public async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await this.cacheProvider.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
