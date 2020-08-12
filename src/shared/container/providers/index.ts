import { container } from 'tsyringe';

import IStoragerovider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStoragerovider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);
