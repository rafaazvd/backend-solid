import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('Users') private userRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) {
      throw new AppError('user does not exists!');
    }
    this.mailProvider.sendMail(email, 'atualização de senha!');
  }
}
export default CreateUserService;
