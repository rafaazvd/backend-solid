import { Router, Response, Request } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import ProductsControllers from '../controllers/ProductsControllers';
import multerConfig from '../../../../../config/upload';

const productsRouter = Router();

const productsControllers = new ProductsControllers();

productsRouter.get('/', productsControllers.index);
productsRouter.get('/:id', productsControllers.show);

productsRouter.post('/', multer(multerConfig).single("file"), productsControllers.create);

productsRouter.put('/:id', celebrate({
  [Segments.BODY]: {
    title: Joi.string(),
    type: Joi.string(),
    description: Joi.string(),
    filename: Joi.string(),
    height: Joi.number(),
    width: Joi.number(),
    price: Joi.number(),
    rating: Joi.number(),
  },
  [Segments.PARAMS]: {
    id: Joi.string()
      .required(),
  },
}), productsControllers.update);

productsRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string()
      .required(),
  },
}), productsControllers.remove);




export default productsRouter;
