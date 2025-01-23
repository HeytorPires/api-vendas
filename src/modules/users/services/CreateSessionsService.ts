import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
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

    return user;
  }
}

export default CreateSessionsService;
