import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../infra/domain/repositories/IUserRepository';
import { IUser } from '../infra/domain/models/IUser';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}
  public async execute(): Promise<IUser[] | undefined> {
    const users = await this.usersRepository.list();

    return users;
  }
}

export default ListUserService;
