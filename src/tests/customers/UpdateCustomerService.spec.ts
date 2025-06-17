import 'reflect-metadata';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepositorys';
import AppError from '@shared/errors/AppError';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomerService: UpdateCustomerService;
let CreateCustomer: CreateCustomerService;
describe('Update Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustomerService = new UpdateCustomerService(fakeCustomersRepository);
    CreateCustomer = new CreateCustomerService(fakeCustomersRepository);
  });
  it('should not update customer when not exist ', async () => {
    const id = '123456789abcd';
    const name = 'joao';
    const email = 'joao@gmail.com';

    await expect(
      updateCustomerService.execute({ id, name, email })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to list all customers', async () => {
    const customer = await CreateCustomer.execute({
      name: 'João silva',
      email: 'João@gmail.com',
    });
    const { id, name, email } = customer;
    const customerShow = await updateCustomerService.execute({
      id,
      name,
      email,
    });
    expect(customerShow.email).toEqual(email);
    expect(customerShow.name).toEqual(name);
    expect(customerShow.id).toEqual(id);
  });
});
