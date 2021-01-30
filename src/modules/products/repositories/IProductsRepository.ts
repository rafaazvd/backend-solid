import Product from '../infra/typeorm/entities/Products';
import ICreateProduct from '../dtos/ICreateProdutcsDTO';
import IUpdateProduct from '../dtos/IUpdateProductsDTO';

export default interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>;
  update(data: IUpdateProduct): Promise<Product>;
  delete(data: any): Promise<any>;
  find(): Promise<Product[]>;
  findOne(data: string): Promise<Product>;
}
