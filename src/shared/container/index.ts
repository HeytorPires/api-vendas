import '@modules/users/providers';
import { container } from 'tsyringe';
import RedisCache from '@shared/providers/cache/implementations/RedisCache';

//repositories
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

//Dominios
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { ICacheProvider } from '@shared/providers/cache/models/IRedisProvider';

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
);
container.registerSingleton<IUserTokensRepository>(
  'UsersTokensRepository',
  UserTokensRepository
);
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductRepository
);
container.registerSingleton<IOrderRepository>(
  'OrdersRepository',
  OrdersRepository
);

container.registerSingleton<ICacheProvider>('cacheProvider', RedisCache);
