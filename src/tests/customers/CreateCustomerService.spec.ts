import 'reflect-metadata';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepositorys';
import AppError from '@shared/errors/AppError';

describe('Create Customer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const CreateCustomer = new CreateCustomerService(fakeCustomersRepository);
    const customer = await CreateCustomer.execute({
      name: 'João silva',
      email: 'João@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });
  it('should not be able to create two customers with the same email', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const CreateCustomer = new CreateCustomerService(fakeCustomersRepository);
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
