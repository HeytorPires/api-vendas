import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('there is already one user with this email');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && old_password) {
      const checkOldPassoword = await bcrypt.compare(
        old_password,
        user.password
      );
      if (!checkOldPassoword) {
        throw new AppError('Old password does not match.');
      }

      const saltRounds = 8;
      user.password = await bcrypt.hash(password, saltRounds);
    }
    user.email = email;
    user.name = name;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
