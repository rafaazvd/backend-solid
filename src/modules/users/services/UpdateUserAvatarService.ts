import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('Users') private userRepository: IUsersRepository,
    @inject('DiskStorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('only authenticated users can change avatar.');
    }
    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }
    const avatar = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = avatar;
    await this.userRepository.save(user);
    return user;
  }
}
