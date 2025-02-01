import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordservice {
  public async execute({ token, password }: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const TokenCreatedAt = userToken.created_at;
    const CompareDateExpires = addHours(TokenCreatedAt, 2);

    if (isAfter(new Date(), CompareDateExpires)) {
      throw new AppError('Token Expired.');
    }
    const saltRounds = 8;
    const hashedPassword = await hash(password, saltRounds);

    user.password = hashedPassword;
    await usersRepository.save(user);

    return user;
  }
}

export default ResetPasswordservice;
