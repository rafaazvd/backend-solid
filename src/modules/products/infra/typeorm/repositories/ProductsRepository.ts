import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProdutcsDTO from '@modules/products/dtos/ICreateProdutcsDTO';
import AppError from '../../../../../shared/errors/AppError';

import Product from '../entities/Products';


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

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }
  public async create({
    title,
    type,
    description,
    filename,
    height,
    width,
    price,
    rating,
  }: ICreateProdutcsDTO): Promise<Product> {
    const product = this.ormRepository.create({
      title,
      type,
      description,
      filename,
      height,
      width,
      price,
      rating,
    });
    await this.ormRepository.save(product);
    return product;
  }

  public async update({
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
    const product = this.ormRepository.update({ id }, {
      title,
      type,
      description,
      filename,
      height,
      width,
      price,
      rating,
    });
    const updatedProduct = await this.ormRepository.findOne(id);

    if(!updatedProduct) {
      throw new AppError('this product does not exist');
    }

    return updatedProduct;
  }

  public async find(): Promise<Product[]> {

    const products = await this.ormRepository.find();

    return products;
  }

  public async findOne(id: string): Promise<Product> {

    const products = await this.ormRepository.findOne({ id });
    if(!products) {
      throw new AppError('this product does not exist');
    }
    return products;
  }

  public async delete({
    id,
  }: IUpdateProdutcs): Promise<any> {
    const product = this.ormRepository.delete(id);

    return product;
  }

}
export default ProductsRepository;
