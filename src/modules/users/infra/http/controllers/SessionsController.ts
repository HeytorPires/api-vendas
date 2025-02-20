import { Request, Response } from 'express';
import CreateSessionsService from '../../../services/CreateSessionsService';
import AppError from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';

class SessionsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    const createSessionsService = new CreateSessionsService();

    const user = await createSessionsService.execute({ email, password });
    response.json(instanceToInstance(user)); // O res.json já envia a resposta e encerra a requisição
    return;
  }
}

export default SessionsController;
