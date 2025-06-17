import 'reflect-metadata';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepositorys';
import AppError from '@shared/errors/AppError';
import ListCustomerService from '@modules/customers/services/ListCustomersService';

let fakeCustomersRepository: FakeCustomersRepository;
let ListCustomer: ListCustomerService;
let CreateCustomer: CreateCustomerService;
describe('List Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    ListCustomer = new ListCustomerService(fakeCustomersRepository);
    CreateCustomer = new CreateCustomerService(fakeCustomersRepository);
  });
  it('should be able to list not customers ', async () => {
    const page = 1;
    const limit = 10;

    expect(await ListCustomer.execute({ page, limit })).rejects.toBeInstanceOf(
      AppError
    );
  });
  it('should be able to list all customers', async () => {
    const page = 1;
    const limit = 10;
    await CreateCustomer.execute({
      name: 'João silva',
      email: 'João@gmail.com',
    });
    const customers = await ListCustomer.execute({ page, limit });
    console.log(customers);
    expect(customers).toHaveProperty('from');
    // expect(Array.isArray(customers.data)).toBe(true);
    // expect(customers.data.length).toBeGreaterThan(0);
  });
});
