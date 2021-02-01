import { inject, injectable } from 'tsyringe';

import ApiKey from '../infra/typeorm/entities/ApiKey';
import IApiKeysRepository from '../repositories/IApiKeysRepository';

@injectable()
class CreateApiKeyService {
  constructor(
    @inject('ApiKeys')
    private apikeysRepository: IApiKeysRepository,
  ) {}

  public async execute(key: string): Promise<ApiKey> {

    const apikey = await this.apikeysRepository.findOne(key);

    return apikey;
  }
}
export default CreateApiKeyService;
