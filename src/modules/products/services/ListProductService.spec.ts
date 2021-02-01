import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import ListProductService from './ListProductService';
import CreateProductService from './CreateProductService';
import { id } from 'date-fns/locale';

describe('ListProduct', () => {
  it('shold be able list products', async () => {
    const fakeAProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(
      fakeAProductRepository,
    );
    await createProduct.execute({
      title: 'Novo produto 1',
      type: 'acessorio eletronico',
      description: 'fone sem fio',
      filename: 'fone.jpg',
      height: 200,
      width:300,
      price: 45,
      rating: 3,
    });
    await createProduct.execute({
      title: 'Novo produto 2',
      type: 'acessorio eletronico',
      description: 'fone sem fio',
      filename: 'fone.jpg',
      height: 200,
      width:300,
      price: 45,
      rating: 3,
    });
    await createProduct.execute({
      title: 'Novo produto 3',
      type: 'acessorio eletronico',
      description: 'fone sem fio',
      filename: 'fone.jpg',
      height: 200,
      width:300,
      price: 45,
      rating: 3,
    });
    const array = [
      {
      title: 'Novo produto 1',
      type: 'acessorio eletronico',
      description: 'fone sem fio',
      filename: 'fone.jpg',
      height: 200,
      width:300,
      price: 45,
      rating: 3,
      },{
        title: 'Novo produto 2',
        type: 'acessorio eletronico',
        description: 'fone sem fio',
        filename: 'fone.jpg',
        height: 200,
        width:300,
        price: 45,
        rating: 3,
      },{
        title: 'Novo produto 3',
        type: 'acessorio eletronico',
        description: 'fone sem fio',
        filename: 'fone.jpg',
        height: 200,
        width:300,
        price: 45,
        rating: 3,
      }];
    const listProduct = new ListProductService(
      fakeAProductRepository,
    );
    const products = await listProduct.execute();

    expect(array).not.toEqual(expect.arrayContaining(products));
  });
});
