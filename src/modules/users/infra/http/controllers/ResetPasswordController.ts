import { Request, Response } from 'express';
import ResetPasswordService from '../../../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response) {
    const { password, token } = request.body;
    const sendForgotPasswordEmail = new ResetPasswordService();

    await sendForgotPasswordEmail.execute({ token, password });

    response.status(204).json();
    return;
  }
}
