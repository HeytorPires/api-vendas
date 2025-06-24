import 'reflect-metadata';
import FakeProductRepository from '../repositories/FakeProductRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import AppError from '@shared/errors/AppError';

let fakeProductRepository: FakeProductRepository;
let showProduct: ShowProductService;
let createProduct: CreateProductService;

describe('Show products', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    showProduct = new ShowProductService(fakeProductRepository);
    createProduct = new CreateProductService(fakeProductRepository);
  });

  it('should be able to show a product existent', async () => {
    const { name, price, quantity } = {
      name: 'Mouse',
      price: 110,
      quantity: 150,
    };
    const product = await createProduct.execute({ name, price, quantity });
    const { id } = product;
    await expect(showProduct.execute({ id })).toHaveProperty('id');
  });
  it('should be able to show a product existent', async () => {
    const id = '123456789abcde';
    await expect(showProduct.execute({ id })).rejects.toBeInstanceOf(AppError);
  });
});
