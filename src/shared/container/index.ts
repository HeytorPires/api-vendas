import { container } from 'tsyringe';

import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IUserRepository } from '@modules/users/infra/domain/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/users/infra/domain/repositories/IUserTokensRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

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
