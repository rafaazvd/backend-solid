import { getRepository, Repository } from 'typeorm';
import  { uuid } from 'uuidv4';

import IApiKeysRepository from '@modules/apikey/repositories/IApiKeysRepository';
import ICreateApiKeyDTO from '@modules/apikey/dtos/ICreateApiKeyDTO';
import AppError from '../../../../../shared/errors/AppError';
import ApiKey from '../entities/ApiKey';


class ApiKeysRepository implements IApiKeysRepository {
  private ormRepository: Repository<ApiKey>;

  constructor() {
    this.ormRepository = getRepository(ApiKey);
  }

  public async create({
    client,
  }: ICreateApiKeyDTO): Promise<ApiKey> {
    const apikey = this.ormRepository.create({
      key: uuid(),
      client,
    });
    await this.ormRepository.save(apikey);
    console.log(apikey);
    return apikey;
  }

  public async findOne({
    client,
  }: ICreateApiKeyDTO): Promise<ApiKey> {
    const apikey = await this.ormRepository.findOne({where: client});
    if (!apikey) {
      throw new AppError('ApiKey expired!')
    }
    return apikey;
  }


}
export default ApiKeysRepository;
