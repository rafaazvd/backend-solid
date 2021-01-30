import { Request, Response } from 'express';
import { container, inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';


import CreateProductService from '../../../services/CreateProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import IProductsRepository from '../../../repositories/IProductsRepository';

@injectable()
export default class ProductsControllers {

  constructor(
    @inject('Products')
    private productsRepository: IProductsRepository
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      title,
      type,
      description,
      filename,
      height,
      width,
      price,
      rating,
     } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      title,
      type,
      description,
      filename,
      height,
      width,
      price,
      rating,
    });
    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      id,
      title,
      type,
      description,
      filename,
      height,
      width,
      price,
      rating,
     } = req.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
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
    return res.json(product);
  }


  public async index(req: Request, res: Response): Promise<Response> {

    const products = this.productsRepository.find();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {

    const { id } = req.body;

    const product = await this.productsRepository.findOne(id);

    return res.json(product);
  }

  public async remove(req: Request, res: Response): Promise<Response> {

    const { id } = req.body;

    const product = await this.productsRepository.delete(id);

    return res.json(product);
  }

}
