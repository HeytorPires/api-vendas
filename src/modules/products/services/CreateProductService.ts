import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IProductCreate } from '../domain/models/IProductCreate';
import { IProduct } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {
    this.productsRepository;
  }
  public async execute({
    name,
    price,
    quantity,
  }: IProductCreate): Promise<IProduct> {
    // Verifica se já existe um produto com o mesmo nome
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name!');
    }
    const redisCache = new RedisCache();

    // Cria e salva o novo produto
    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}

export default CreateProductService;
