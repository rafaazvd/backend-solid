import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Products';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindProductService {
  constructor(
    @inject('Products')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Product> {

    const product = await this.productsRepository.findOne(id);

    return product;
  }
}
export default FindProductService;
