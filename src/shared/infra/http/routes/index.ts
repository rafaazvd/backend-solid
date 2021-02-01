import { Router, Response, Request } from 'express';
import productsRouter from '../../../../modules/products/infra/http/routes/products.routes';
import apikeysRouter from '../../../../modules/apikey/infra/http/routes/apikey.routes';
import handleAccessToken from '../middlewares/handleAccessToken';

const routes = Router();
routes.use('/apikeys', apikeysRouter);

routes.use('/products', handleAccessToken, productsRouter);

routes.get('/', async (request, response) => {
  return response.status(200).json({msg : 'REST WebAPI Challenge 20200630 Running'})
});
export default routes;
