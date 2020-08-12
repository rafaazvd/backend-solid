import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '../../../shared/errors/AppError';

import FakeUserRepository from '../repositories/fake/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar of user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
    const avatarFileName = 'ksikcndcdc.jpg';
    const user = await fakeUserRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '1234567',
    });
    const fileName = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName,
    });
    expect(fileName.avatar).toBe(avatarFileName);
  });
  it('should not be able to update avatar non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
    const avatarFileName = 'ksikcndcdc.jpg';

    expect(
      updateUserAvatarService.execute({
        user_id: 'null',
        avatarFileName,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update avatar of user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const spyDelete = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
    const avatarFileName = 'avatar.jpg';
    const user = await fakeUserRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '1234567',
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName,
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar1.jpg',
    });
    expect(spyDelete).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar1.jpg');
  });
});
