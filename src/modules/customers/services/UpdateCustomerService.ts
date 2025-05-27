import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { inject, injectable } from 'tsyringe';
@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {
    this.customersRepository;
  }
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found.');
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('there is already one customer with this email');
    }

    customer.email = email;
    customer.name = name;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
