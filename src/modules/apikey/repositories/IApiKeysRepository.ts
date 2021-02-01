import ApiKey from '../infra/typeorm/entities/ApiKey';
import ICreateApiKeyDTO from '../dtos/ICreateApiKeyDTO';


export default interface IApiKeysRepository {
  create(data: ICreateApiKeyDTO): Promise<ApiKey>;
  findOne(data: string): Promise<ApiKey>;
}
