import 'reflect-metadata';
import AppError from '../../../src/shared/errors/AppError';
import FakeProductRepository from '../repositories/FakeProductRepository';
import CreateProductService from '@modules/products/services/CreateProductService';

let fakeProductRepository: FakeProductRepository;
let createProduct: CreateProductService;
describe('Create Customer', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProduct = new CreateProductService(fakeProductRepository);
  });

  it('should be able to create a new product', async () => {
    const { name, price, quantity } = {
      name: 'Mouse',
      price: 110,
      quantity: 150,
    };
    console.log('Iniciando criação do produto...');
    const product = await createProduct.execute({ name, price, quantity });
    console.log('Produto criado:', product);
    expect(product).toHaveProperty('id');
  }, 15000);
  it('should not be able to create two Product with the same name', async () => {
    const { name, price, quantity } = {
      name: 'Mouse',
      price: 110,
      quantity: 150,
    };
    await createProduct.execute({ name, price, quantity });

    await expect(
      createProduct.execute({ name, price, quantity })
    ).rejects.toBeInstanceOf(AppError);
  }, 15000);
});
