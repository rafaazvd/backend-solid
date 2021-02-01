import { getRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
    const key = uuidv4();

    const apikey = this.ormRepository.create({
      key,
      client,
    });
    await this.ormRepository.save(apikey);
    console.log(apikey);
    return apikey;
  }

  public async findOne(key: string): Promise<ApiKey> {
    const apikey = await this.ormRepository.findOne({ key });
    if (!apikey) {
      throw new AppError('ApiKey expired!')
    }
    return apikey;
  }


}
export default ApiKeysRepository;
