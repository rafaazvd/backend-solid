import { Request, Response } from 'express';
import { container, inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';


import CreateApiKeyService from '../../../services/CreateApiKeyService';
import FindApiKeyService from '../../../services/FindApiKeyService';
import IApiKeysRepository from '../../../repositories/IApiKeysRepository';

@injectable()
export default class ApikeyController {

  constructor(
    @inject('ApiKeys')
    private apikeysRepository: IApiKeysRepository,
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      client,
     } = req.body;

    const createApiKey = container.resolve(CreateApiKeyService);

    const apiKey = await createApiKey.execute({
      key: uuid(),
      client
    });
    return res.json(apiKey);
  }
  public async findOne(key: string): Promise<any> {

    const findApiKey = container.resolve(FindApiKeyService);
     const apikey = await findApiKey.execute(key);
     return apikey;
  }


}
