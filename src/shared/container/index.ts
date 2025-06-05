import { container } from 'tsyringe';

import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

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
// container.registerSingleton<IUserTokensRepository>(
//   'UsersTokensRepository',
//   UserTokensRepository
// );
