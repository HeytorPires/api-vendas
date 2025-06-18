import AppError from '@shared/errors/AppError';
import ICreateOrders from '../domain/models/ICreateOrders';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IOrder } from '../domain/models/IOrders';
import OrderProducts from '../infra/typeorm/entities/OrdersProducts';

@injectable()
class CreateOrderService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('OrdersRepositorys')
    private ordersRepositorys: IOrderRepository,
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {
    this.customerRepository;
    this.ordersRepositorys;
    this.productsRepository;
  }
  public async execute({
    customer_id,
    products,
  }: ICreateOrders): Promise<IOrder> {
    const customerExists = await this.customerRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const productExist = await this.productsRepository.findAllByIds(products);
    if (!productExist) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existsProductsIds = productExist.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id)
    );

    if (!checkInexistentProducts.length) {
      throw new AppError(
        `Could not find any product ${checkInexistentProducts[0].id}`
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
    const order = await this.ordersRepositorys.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;
    const updatedProductQuantity = productExist.map((product) => {
      const orderProduct = order_products.find(
        (p) => p.product.id === product.id
      );

      if (!orderProduct) return product;

      return {
        ...product,
        quantity: product.quantity - orderProduct.quantity,
      };
    });
    for (const product of updatedProductQuantity) {
      await this.productsRepository.save(product);
    }

    return order;
  }
}

export default CreateOrderService;
