import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name);

    const redisCache = new RedisCache();

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
