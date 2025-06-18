import 'reflect-metadata';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepositorys';
import AppError from '@shared/errors/AppError';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let CreateCustomer: CreateCustomerService;
let DeleteCustomer: DeleteCustomerService;
describe('Delete Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    CreateCustomer = new CreateCustomerService(fakeCustomersRepository);
    DeleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
  });

  it('should be able to delete a customer existent', async () => {
    const customer = await CreateCustomer.execute({
      name: 'João silva',
      email: 'João@gmail.com',
    });
    const { id } = customer;
    await DeleteCustomer.execute({ id });

    expect(customer).toBeUndefined;
  });
  it('should not be able to delete customer not existent', async () => {
    const id = '123456789abcd';

    await expect(DeleteCustomer.execute({ id })).rejects.toBeInstanceOf(
      AppError
    );
  });
});
