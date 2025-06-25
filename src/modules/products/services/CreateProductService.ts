import AppError from '@shared/errors/AppError';
import { IProductCreate } from '../domain/models/IProductCreate';
import { IProduct } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ICacheProvider } from '@shared/providers/cache/models/IRedisProvider';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('cacheProvider')
    private cacheProvider: ICacheProvider
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

    // Cria e salva o novo produto
    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await this.cacheProvider.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}

export default CreateProductService;
