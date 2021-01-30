import { uuid } from 'uuidv4';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProdutcsDTO from '@modules/products/dtos/ICreateProdutcsDTO';
import IUpdateProductsDTO from '@modules/products/dtos/IUpdateProductsDTO';
import Product from '../../infra/typeorm/entities/Products';


class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];

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
    const product = new Product();
    Object.assign(product, {
      id: uuid(),
      title,
      type,
      description,
      filename,
      height,
      width,
      price,
      rating,
    });
    this.products.push(product);
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
  }: IUpdateProductsDTO): Promise<Product> {
    const index = this.products.findIndex(
      (prod: any) => String(prod.id) === String(id),
    );
    const newProduct = {
      id,
    title,
    type,
    description,
    filename,
    height,
    width,
    price,
    rating,
    }
    const newListProduct = [...this.products];
    const pdct = Object.assign(newListProduct[index], newProduct);
    newListProduct[index] = pdct;
    this.products.push(pdct);
    return pdct;
  }

  public async delete(id: string): Promise<any> {
    const index = this.products.findIndex(
      (prod: any) => String(prod.id) === String(id),
    );
    const product = this.products[index];
    const newArr = [...this.products];
    newArr.splice(index, 1);
    this.products = newArr;

    return product as Product;
  }
  //find e findOne
  public async find(): Promise<Product[]> {

    return this.products;
  }
  public async findOne(id: string): Promise<Product> {
    const index = this.products.findIndex(
      (prod: any) => String(prod.id) === String(id),
    );
    const product = this.products[index];
    return product;
  }
}
export default ProductsRepository;
