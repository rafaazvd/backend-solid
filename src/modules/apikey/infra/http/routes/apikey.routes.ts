import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ApiKeysControllers from '../controllers/ApiKeysControllers';

const apikeysRouter = Router();

const apikeysControllers = new ApiKeysControllers();

apikeysRouter.post('/', celebrate({
  [Segments.BODY]: {
    client: Joi.string().required(),
  },
}), apikeysControllers.create);




export default apikeysRouter;
