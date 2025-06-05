import { Request, Response } from 'express';
import ListProductService from '../../../services/ListProductService';
import ShowProductService from '../../../services/ShowProductService';
import CreateProductService from '../../../services/CreateProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import { container } from 'tsyringe';

export default class ProductsController {
  public async index(request: Request, response: Response) {
    const listProducts = container.resolve(ListProductService);
    const products = await listProducts.execute();

    response.json(products);
    return;
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showProduct = container.resolve(ShowProductService);
    const product = await showProduct.execute({ id });

    response.json(product); // Retorna o produto encontrado
    return;
  }

  public async create(request: Request, response: Response) {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({ name, price, quantity });

    response.status(201).json(product); // Retorna o produto criado
    return;
  }

  public async update(request: Request, response: Response) {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = container.resolve(UpdateProductService);
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

    const deleteProduct = container.resolve(DeleteProductService);
    await deleteProduct.execute(id);

    response.status(204).send(); // Retorna 204 No Content após a exclusão
    return;
  }
}
