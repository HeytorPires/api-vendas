import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';

interface IRequest {
  id: string;
}
@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {
    this.productsRepository;
  }
  public async execute({ id }: IRequest): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }
    return product;
  }
}

export default ShowProductService;
