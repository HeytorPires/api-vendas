import 'reflect-metadata';
import FakeProductRepository from '../repositories/FakeProductRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import AppError from '@shared/errors/AppError';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import UpdateProductService from '@modules/products/services/UpdateProductService';

let fakeProductRepository: FakeProductRepository;
let updateProduct: UpdateProductService;
let createProduct: CreateProductService;

describe('Update product', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    updateProduct = new UpdateProductService(fakeProductRepository);
    createProduct = new CreateProductService(fakeProductRepository);
  });

  it('should be able to update a product existent', async () => {
    const { name, price, quantity } = {
      name: 'Mouse',
      price: 110,
      quantity: 150,
    };
    const product = await createProduct.execute({ name, price, quantity });

    const { id } = product;
    const [nameNew, priceNew, quantityNew] = ['Teclado', 100, 150];

    await expect(
      updateProduct.execute({
        id,
        name: nameNew,
        price: priceNew,
        quantity: quantityNew,
      })
    ).toHaveProperty('name', nameNew);
  });
  it('should be able to update a product not existent', async () => {
    const id = '123456789abcde';
    const [nameNew, priceNew, quantityNew] = ['Teclado', 100, 150];

    await expect(
      updateProduct.execute({
        id,
        name: nameNew,
        price: priceNew,
        quantity: quantityNew,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
