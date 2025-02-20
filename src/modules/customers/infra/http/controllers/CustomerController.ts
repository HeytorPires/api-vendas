import { Request, Response } from 'express';
import ListCustomersService from '../../../services/ListCustomersService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import CreateCustomerService from '../../../services/CreateCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import AppError from '@shared/errors/AppError';

export default class CustomerController {
  public async index(request: Request, response: Response) {
    const listCsutomers = new ListCustomersService();
    const customers = await listCsutomers.execute();

    response.json(customers); // Retorna os produtos
    return;
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showCustomer = new ShowCustomerService();
    const Customer = await showCustomer.execute({ id });

    response.json(Customer); // Retorna o produto encontrado
    return;
  }

  public async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const createCustomer = new CreateCustomerService();
    const Customer = await createCustomer.execute({ name, email });

    response.status(201).json(Customer); // Retorna o produto criado
    return;
  }

  public async update(request: Request, response: Response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = new UpdateCustomerService();
    const Customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    response.json(Customer); // Retorna o produto atualizado
    return;
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();
    await deleteCustomer.execute({ id });

    response.status(204).send(); // Retorna 204 No Content após a exclusão
    return;
  }
}
