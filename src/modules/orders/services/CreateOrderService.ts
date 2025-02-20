import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<void> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const productExist = await productsRepository.findAllByIds(products);
    if (!productExist) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existsProductsIds = productExist.map((product) => product.id);

    const checkInesxistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id)
    );

    if (!checkInesxistentProducts.length) {
      throw new AppError(
        `Could not find any product ${checkInesxistentProducts[0].id}`
      );
    }

    const quantityAvailable = products.filter(
      (product) =>
        productExist.filter((p) => p.id === product.id)[0].quantity <
        product.quantity
    );
    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`
      );
    }
    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      price: productExist.filter((p) => p.id === product.id)[0].price,
      quantity: product.quantity,
    }));
    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        productExist.filter((p) => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);
  }
}

export default CreateOrderService;
