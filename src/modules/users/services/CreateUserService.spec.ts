import AppError from '../../../shared/errors/AppError';
import FakeUserRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateAppointment', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const user = await createUserService.execute({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '1234567',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '1234567',
    });
    expect(
      createUserService.execute({
        name: 'john doe',
        email: 'johfvndfoe@mail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
