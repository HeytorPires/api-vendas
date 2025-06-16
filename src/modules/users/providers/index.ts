import { container } from 'tsyringe';
import BcryptHashProvider from './HashProvider/implementations/BcryptHashProvider';
import { IHashProvider } from './HashProvider/models/iHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
