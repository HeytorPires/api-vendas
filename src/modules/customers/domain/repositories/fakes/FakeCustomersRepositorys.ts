import { v4 as uuidv4 } from 'uuid';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import {
  ICustomerRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomerRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { IPaginateCustomer } from '@modules/customers/domain/models/IPaginateCustomer';

class FakeCustomersRepository
  implements Omit<ICustomerRepository, 'remove' | 'findAll' | 'list'>
{
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);
    return customer;
  }
  public async remove(customer: Customer): Promise<void> {}

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateCustomer | undefined> {
    return undefined;
  }
  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find((c) => c.name === name);
    return customer;
  }
  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find((c) => c.id === id);
    return customer;
  }
  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find((c) => c.email === email);
    return customer;
  }
}

export default FakeCustomersRepository;
