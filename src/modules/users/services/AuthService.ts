import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('Users') private userRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('email or passwd not combine.', 401);
    }
    const compareHashPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!compareHashPassword) {
      throw new AppError('email or passwd not combine.', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}
export default CreateUserService;
