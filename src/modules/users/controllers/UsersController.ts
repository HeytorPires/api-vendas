import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';
import AppError from '@shared/errors/AppError';

export default class UsersController {
  public async index(request: Request, response: Response) {
    const listUser = new ListUserService();
    try {
      const users = await listUser.execute();

      response.json(users);
      return;
    } catch (error) {
      if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message });
        return;
      }
      return;
    }
  }

  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    try {
      const createUsers = new CreateUserService();

      const user = await createUsers.execute({ name, email, password });

      response.json(user);
      return;
    } catch (error) {
      if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message });
        return;
      }
      return;
    }
  }
}
