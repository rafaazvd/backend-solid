import { inject, injectable } from 'tsyringe';
var fs = require("fs");

import IProduct from '../dtos/ICreateProdutcsDTO';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('Products')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({file}: any): Promise<any> {
    const jsonData = fs.readFileSync(file.path);

    const array = JSON.parse(jsonData);
    try {
      await Promise.all(
      array.map(async (product: IProduct) => {
        await this.productsRepository.create(product);
      }),
    );
    return 'produtos cadastrados';
    } catch (error) {
      return error;
    }


    // const product = await this.productsRepository.create({
    //   title,
    //   type,
    //   description,
    //   filename,
    //   height,
    //   width,
    //   price,
    //   rating,
    // });
  }
}
export default CreateProductService;
