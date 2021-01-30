import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Products';
import IProduct from '../dtos/ICreateProdutcsDTO';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('Products')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    title,
    type,
    description,
    filename,
    height,
    width,
    price,
    rating,
  }: IProduct): Promise<Product> {

    const product = await this.productsRepository.create({
      title,
      type,
      description,
      filename,
      height,
      width,
      price,
      rating,
    });

    return product;
  }
}
export default CreateProductService;
