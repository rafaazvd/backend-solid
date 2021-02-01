import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Products';
import IProductsRepository from '../repositories/IProductsRepository';


@injectable()
class ListProductService {
  constructor(
    @inject('Products')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {

    const product = await this.productsRepository.find();

    return product;
  }
}
export default ListProductService;
