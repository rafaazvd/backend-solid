import { inject, injectable } from 'tsyringe';

import ApiKey from '../infra/typeorm/entities/ApiKey';
import IApikey from '../dtos/ICreateApiKeyDTO';
import IApiKeysRepository from '../repositories/IApiKeysRepository';

@injectable()
class CreateApiKeyService {
  constructor(
    @inject('Products')
    private apikeysRepository: IApiKeysRepository,
  ) {}

  public async execute({
    client,
  }: IApikey): Promise<ApiKey> {

    const apikey = await this.apikeysRepository.create({
      client,
    });

    return apikey;
  }
}
export default CreateApiKeyService;
