import { Request, Response } from 'express';
import { container, inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';


import CreateProductService from '../../../services/CreateProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import FindProductService from '../../../services/FindProductService';
import ListProductService from '../../../services/ListProductService';
import IProductsRepository from '../../../repositories/IProductsRepository';

@injectable()
export default class ProductsControllers {

  constructor(
    @inject('Products')
    private productsRepository: IProductsRepository,
  ) {
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      file,
    });
    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
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
     const { id } = req.params;

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

    const listProduct = container.resolve(ListProductService);

    const products = await listProduct.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;

    const listProduct = container.resolve(FindProductService);

    const product = await listProduct.execute({id});

    return res.json(product);
  }

  public async remove(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;

    const deleteProduct = container.resolve(DeleteProductService);

    const product = await deleteProduct.execute({id});

    return res.json(product);
  }

}
