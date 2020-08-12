import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthService from '../../../services/AuthService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const auth = container.resolve(AuthService);
    const { user, token } = await auth.execute({
      email,
      password,
    });
    delete user.password;
    res.json({ user, token });
  }
}
