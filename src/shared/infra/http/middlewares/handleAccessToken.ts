import { Request, Response, NextFunction } from 'express';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'uuid';
import ApiKey from '../../../../modules/apikey/infra/typeorm/entities/ApiKey';
import AppError from '../../../errors/AppError';


// private ormRepository: Repository<ApiKey>;
export default async function handleAccessToken(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {

  const ormRepository:  Repository<ApiKey> = getRepository(ApiKey);
  const accessToken = request.header('Access-Token');

  if (!accessToken) {
    throw new AppError('Access Token obrigatória.', 401);
  }

  if (!validate(accessToken)) {
    throw new AppError('Access Token inválida ou não existe.', 400);
  }

  const apiKey = await ormRepository.find();

  if (!apiKey) {
    throw new AppError('Access Token inválida ou não existe2.', 400);
  }

  request.client = apiKey.client;
  // id do cliente igual id campo client no schema apikey

  next();
}
