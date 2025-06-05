import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject } from 'tsyringe';

interface IRequest {
  id: string;
}
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {
    this.productsRepository;
  }
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }
    return product;
  }
}

export default ShowProductService;
