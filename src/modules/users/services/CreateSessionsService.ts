import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const hashedPassword = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const hashToken: string = authConfig.jwt.secret;
    // melhor seria a constante a baixo, mas a tipagem do projeto está zuada
    // const ExpiresTime: string | number = authConfig.jwt.expiresIn;
    const token = sign({}, hashToken, {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}

export default CreateSessionsService;
