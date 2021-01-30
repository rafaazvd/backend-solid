import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Products';
import IProductsRepository from '../repositories/IProductsRepository';

interface IUpdateProdutcs {
  id: string;
  title?: string;
  type?: string;
  description?: string;
  filename?: string;
  height?: number;
  width?: number;
  price?: number;
  rating?: number;
}
@injectable()
class UpdateProductService {
  constructor(
    @inject('Products')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    title,
    type,
    description,
    filename,
    height,
    width,
    price,
    rating,
  }: IUpdateProdutcs): Promise<Product> {

    const product = await this.productsRepository.update({
      id,
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
export default UpdateProductService;
