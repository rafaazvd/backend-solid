var fs = require("fs");
import { Request, Response, NextFunction } from 'express';
import { container, inject, injectable } from 'tsyringe';

import ProductController from '../../../services/CreateProductService';
import IProductDTO from '../../../dtos/ICreateProdutcsDTO';

// const productsController = new ProductController()
// fs.readFile("./my-file.json" , "utf8", function(err: any, data: any){
//   if(err){
//     return console.log("Erro ao ler arquivo");
//   }
//   var jsonData = fs.readFileSync(data);
//   console.log(jsonData);

// //   var jsonData = JSON.parse(data); // faz o parse para json
// //  /**
// //   Se precisar em array use:
// //   jsonData = Object.keys(jsonData);
// //  / */
// });
export default async function readFile (
  request: Request,
  response: Response,
  next: NextFunction,
  ) {
  const { file } = request;
  const createProduct = container.resolve(ProductController);
  var jsonData = fs.readFileSync(file.path);

  const array = JSON.parse(jsonData);
  try {
    await Promise.all(
    array.map(async (product: IProductDTO) => {
      await createProduct.execute(product);
    }),
  );
  return response.status(200).json({msg: 'products cadasreados!'});
  } catch (error) {
    return response.status(200).json({erro: error});
  }
  next()
}
