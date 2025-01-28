import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';
import AppError from '@shared/errors/AppError';

export default class ProductsController {
  public async index(request: Request, response: Response) {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();

    response.json(products); // Retorna os produtos
    return;
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });

    response.json(product); // Retorna o produto encontrado
    return;
  }

  public async create(request: Request, response: Response) {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });

    response.status(201).json(product); // Retorna o produto criado
    return;
  }

  public async update(request: Request, response: Response) {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    response.json(product); // Retorna o produto atualizado
    return;
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });

    response.status(204).send(); // Retorna 204 No Content após a exclusão
    return;
  }
}
