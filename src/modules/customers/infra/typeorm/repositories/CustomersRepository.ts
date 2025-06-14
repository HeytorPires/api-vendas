import { Repository, getRepository } from 'typeorm';
import Customer from '../entities/Customer';
import {
  ICustomerRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomerRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { IPaginateCustomer } from '@modules/customers/domain/models/IPaginateCustomer';

class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;
  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }
  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { name } });
    return customer;
  }
  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { id } });
    return customer;
  }
  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { email } });
    return customer;
  }
  public async list(): Promise<Customer[] | undefined> {
    const user = await this.ormRepository.find();
    return user;
  }
  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateCustomer> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const lastPage = Math.ceil(count / take);

    return {
      from: skip + 1,
      to: skip + customers.length,
      per_page: take,
      total: count,
      current_page: page,
      prev_page: page > 1 ? page - 1 : null,
      next_page: page < lastPage ? page + 1 : null,
      data: customers,
    };
  }
}

export default CustomersRepository;
