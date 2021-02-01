import { Request, Response, NextFunction } from 'express';
import { createConnection, getConnection, Repository, getRepository } from 'typeorm';
import { validate } from 'uuid';
import ApiKey from '../../../../modules/apikey/infra/typeorm/entities/ApiKey';
import IApiKey from '../../../../modules/apikey/repositories/IApiKeysRepository';
import RepositoryApiKey from '../../../../modules/apikey/infra/typeorm/repositories/ApiKeysRepository';
import AppError from '../../../errors/AppError';
import ApiKeysControllers from '../../../../modules/apikey/infra/http/controllers/ApiKeysControllers';



// private ormRepository: Repository<ApiKey>;
const apikeysControllers = new ApiKeysControllers();

export default async function handleAccessToken(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {

  const accessToken = request.header('Access-Token');

  if (!accessToken) {
    throw new AppError('Access Token obrigatória.', 401);
  }

  if (!validate(accessToken)) {
    throw new AppError('Access Token inválida ou não existe.', 400);
  }
  const apikey = await apikeysControllers.findOne(accessToken);

  if (!apikey) {
    throw new AppError('Access Token inválida ou não existe2.', 400);
  }

  next();
}
