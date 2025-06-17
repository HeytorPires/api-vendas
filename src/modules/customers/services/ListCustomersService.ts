import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { IPaginateCustomer } from '../domain/models/IPaginateCustomer';
import AppError from '@shared/errors/AppError';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IPaginateCustomer> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    if (!customers) {
      throw new AppError('There is no client to list');
    }
    return customers!;
  }
}

export default ListCustomerService;
