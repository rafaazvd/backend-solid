import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import Users from '../../infra/typeorm/entities/Users';

class UsersRepository implements IUsersRepository {
  private users: Users[] = [];

  public async findById(id: string): Promise<Users | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const findEmail = this.users.find(user => user.email === email);
    return findEmail;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<Users> {
    const users = new Users();
    Object.assign(users, {
      id: uuid(),
      name,
      email,
      password,
    });

    this.users.push(users);

    return users;
  }

  public async save(user: Users): Promise<Users> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}
export default UsersRepository;
