import { getRepository, Repository } from 'typeorm';

import ICreateProdutcsDTO from '@modules/products/dtos/ICreateProdutcsDTO';
import IProductsRepository from '../../../repositories/IProductsRepository';
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
  private removeUndefinedProperties (obj: Record<string, unknown>): Record<string, unknown> {
    const newObj = Object.fromEntries(
      Object.entries(obj).filter(([, value]) => value !== undefined),
    );
    return newObj;
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
    const updatedProduct = await this.ormRepository.findOne({ id });

    if(!updatedProduct) {
      throw new AppError('this product does not exist');
    }

    // title ? updatedProduct.title = title: null;
    // type ? updatedProduct.type = type: null;
    // description ? updatedProduct.description = description: null;
    // filename ? updatedProduct.filename = filename: null;
    // height ? updatedProduct.height = height: null;
    // width ? updatedProduct.width = width: null;
    // price ? updatedProduct.price = price: null;
    // rating ? updatedProduct.rating = rating: null;

    const valuesToUpdate = this.removeUndefinedProperties({
      id,
      title,
      type,
      description,
      filename,
      height,
      width,
      price,
      rating,
    })
    Object.assign(updatedProduct, valuesToUpdate)
    return this.ormRepository.save(updatedProduct);

  }

  public async find(): Promise<Product[]> {

    const products = await this.ormRepository.find();

    return products;
  }

  public async findOne(id: string): Promise<Product> {

    const products = await this.ormRepository.findOne(id);
    if(!products) {
      throw new AppError('this product does not exist');
    }
    return products;
  }

  public async delete({
    id,
  }: IUpdateProdutcs): Promise<any> {

    const deleteProduct = await this.ormRepository.findOne({ id });
    if(!deleteProduct) {
      throw new AppError('this product does not exist');
    }
    await this.ormRepository.delete(deleteProduct);

    return deleteProduct;
  }

}
export default ProductsRepository;
