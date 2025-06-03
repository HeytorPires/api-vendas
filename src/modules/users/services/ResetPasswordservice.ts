import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { IResetPasswordUser } from '../infra/domain/models/IResetPasswordUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../infra/domain/repositories/IUserRepository';
import { IUserTokensRepository } from '../infra/domain/repositories/IUserTokensRepository';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUserTokensRepository
  ) {}
  public async execute({ token, password }: IResetPasswordUser) {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

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
    await this.usersRepository.save(user);

    return user;
  }
}

export default ResetPasswordService;
