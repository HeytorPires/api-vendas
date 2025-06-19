import 'reflect-metadata';
import AppError from '../../../src/shared/errors/AppError';
import CreateSessionsService from '../../../src/modules/users/services/CreateSessionsService';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ListUserService from '@modules/users/services/ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let ListUser: ListUserService;
let hashProvider: FakeHashProvider;

describe('List Users', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    ListUser = new ListUserService(fakeUsersRepository);
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'joao',
      email: 'João@gmail.com',
      password: '123456',
    });

    const response = await ListUser.execute();
    expect(response).toHaveProperty('token');
  });
  it('should be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'joao',
      email: 'João@gmail.com',
      password: '123456',
    });

    await expect(
      CreateSession.execute({
        email: 'João@gmail.com',
        password: 'abcdef',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to authenticate without user', async () => {
    await expect(
      CreateSession.execute({
        email: 'João@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  //   it('should not be able to create two users with the same email', async () => {
  //     const User = await fakeUsersRepository.create({
  //       name: 'joao',
  //       email: 'João@gmail.com',
  //       password: '123456',
  //     });
  //     expect(
  //       CreateSession.execute({
  //         email: 'João@gmail.com',
  //         password: '123456',
  //       })
  //     ).rejects.toBeInstanceOf(AppError);
  //   });
});
