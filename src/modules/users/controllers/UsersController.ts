import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async index(request: Request, response: Response) {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    response.json(users);
    return;
  }

  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const createUsers = new CreateUserService();

    const user = await createUsers.execute({ name, email, password });

    response.json(user);
    return;
  }
}
