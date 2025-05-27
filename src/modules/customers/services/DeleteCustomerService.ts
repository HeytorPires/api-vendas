import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {
    this.customersRepository;
  }
  public async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found.');
    }
    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
