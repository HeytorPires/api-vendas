import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';
import AppError from '@shared/errors/AppError';

export default class ProductsController {
  public async index(request: Request, response: Response) {
    try {
      const listProducts = new ListProductService();
      const products = await listProducts.execute();

      response.json(products); // Retorna os produtos
      return;
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Internal server error' });
      return;
    }
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const showProduct = new ShowProductService();
      const product = await showProduct.execute({ id });

      response.json(product); // Retorna o produto encontrado
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: 'Internal server error' });
      return;
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response) {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    try {
      const updateProduct = new UpdateProductService();
      const product = await updateProduct.execute({
        id,
        name,
        price,
        quantity,
      });

      response.json(product); // Retorna o produto atualizado
      return;
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Internal server error' });
      return;
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const deleteProduct = new DeleteProductService();
      await deleteProduct.execute({ id });

      response.status(204).send(); // Retorna 204 No Content após a exclusão
      return;
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Internal server error' });
      return;
    }
  }
}
