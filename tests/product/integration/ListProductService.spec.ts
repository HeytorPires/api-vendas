import 'reflect-metadata';
import FakeProductRepository from '../repositories/FakeProductRepository';
import ListProductService from '@modules/products/services/ListProductService';
import CreateProductService from '@modules/products/services/CreateProductService';

let fakeProductRepository: FakeProductRepository;
let listProduct: ListProductService;
let createProduct: CreateProductService;

describe('List products', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    listProduct = new ListProductService(fakeProductRepository);
    createProduct = new CreateProductService(fakeProductRepository);
  });

  it('should be able to list a products', async () => {
    const { name, price, quantity } = {
      name: 'Mouse',
      price: 110,
      quantity: 150,
    };
    await createProduct.execute({ name, price, quantity });
    const products = await listProduct.execute();
    expect(products).not.toEqual(0);
  });
});
