import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let CreateSession: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    CreateSession = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'joao',
      email: 'João@gmail.com',
      password: '123456',
    });

    const response = await CreateSession.execute({
      email: 'João@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
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
