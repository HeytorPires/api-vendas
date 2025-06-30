import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProductUpdate } from '../domain/models/IProductUpdate';
import { IProduct } from '../domain/models/IProduct';
import { ICacheProvider } from '@shared/providers/cache/models/IRedisProvider';
@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('cacheProvider')
    private cacheProvider: ICacheProvider
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

    if (productExists && name === product.name) {
      throw new AppError('There is already one product with this name.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.cacheProvider.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
