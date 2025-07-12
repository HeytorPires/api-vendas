import AppError from '@shared/errors/AppError';
import ICreateOrders from '../domain/models/ICreateOrders';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IOrder } from '../domain/models/IOrders';

@injectable()
class CreateOrderService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('OrdersRepository')
    private ordersRepositorys: IOrderRepository,
    @inject('CustomersRepository')
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
    if (products.length < 1) {
      throw new AppError('These products are invalid');
    }

    // Corrigido: mapeia os produtos para o formato esperado
    const productsIds = products.map((product) => ({ id: product.product_id }));

    const productExist =
      await this.productsRepository.findAllByIds(productsIds);
    if (!productExist || productExist.length === 0) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existsProductsIds = productExist.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.product_id)
    );

    if (checkInexistentProducts.length > 0) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].product_id}`
      );
    }

    const quantityAvailable = products.filter((product) => {
      const foundProduct = productExist.find(
        (p) => p.id === product.product_id
      );
      return (foundProduct?.quantity ?? 0) < product.quantity;
    });

    if (quantityAvailable.length > 0) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].product_id}`
      );
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.product_id,
      price: productExist.find((p) => p.id === product.product_id)?.price || 0,
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
