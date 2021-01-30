import { Router, Response, Request } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProductsControllers from '../controllers/ProductsControllers';

const productsRouter = Router();

const productsControllers = new ProductsControllers();

productsRouter.get('/', productsControllers.index);
productsRouter.get('/:id', productsControllers.show);

productsRouter.post('/', celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
    filename: Joi.string().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    price: Joi.number().required(),
    rating: Joi.number().required(),
  },
}), productsControllers.create);

productsRouter.put('/:id', celebrate({
  [Segments.BODY]: {
    title: Joi.string(),
    type: Joi.string(),
    description: Joi.string(),
    filename: Joi.number(),
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
