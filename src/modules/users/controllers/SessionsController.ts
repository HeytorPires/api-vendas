import { Request, Response } from 'express';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';

class SessionsController {
  public async create(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const createSessionsService = new CreateSessionsService();

    const user = await createSessionsService.execute({ email, password });
    res.json(user); // O res.json já envia a resposta e encerra a requisição
    return;
  }
}

export default SessionsController;
