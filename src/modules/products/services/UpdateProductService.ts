import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProductUpdate } from '../domain/models/IProductUpdate';
import { IProduct } from '../domain/models/IProduct';
@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {
    this.productsRepository;
  }
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IProductUpdate): Promise<IProduct | undefined> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productsRepository.findByName(name);

    const redisCache = new RedisCache();

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
