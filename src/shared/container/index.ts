import { container } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductsRepository';
import IApiKeysRepository from '@modules/apikey/repositories/IApiKeysRepository';
import ProductsRepository from '../../modules/products/infra/typeorm/repositories/ProductsRepository';
import ApiKeysRepository from '../../modules/apikey/infra/typeorm/repositories/ApiKeysRepository';

container.registerSingleton<IProductRepository>(
  'Products',
  ProductsRepository,
);
container.registerSingleton<IApiKeysRepository>(
  'ApiKeys',
  ApiKeysRepository,
);
