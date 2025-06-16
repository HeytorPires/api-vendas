import 'reflect-metadata';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepositorys';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let CreateCustomer: CreateCustomerService;
describe('Create Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    CreateCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await CreateCustomer.execute({
      name: 'João silva',
      email: 'João@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });
  it('should not be able to create two customers with the same email', async () => {
    await CreateCustomer.execute({
      name: 'João silva',
      email: 'João@gmail.com',
    });
    expect(
      CreateCustomer.execute({
        name: 'João silva',
        email: 'João@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
