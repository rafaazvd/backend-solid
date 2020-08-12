import AppError from '../../../shared/errors/AppError';
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fake/FakeUsersRepository';
import SendForgotasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const spySendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const SendForgotasswordEmail = new SendForgotasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );
    await fakeUserRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '1234567',
    });
    await SendForgotasswordEmail.execute({
      email: 'johndoe@mail.com',
    });
    expect(spySendMail).toHaveBeenCalled();
  });
  it('should not be able to recover non-existing user password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const SendForgotasswordEmail = new SendForgotasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await expect(
      SendForgotasswordEmail.execute({
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
