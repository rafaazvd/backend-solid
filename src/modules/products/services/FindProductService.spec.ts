import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import FindProductService from './FindProductService';
import CreateProductService from './CreateProductService';
import { id } from 'date-fns/locale';

describe('FindProduct', () => {
  it('shold be able list a product from id', async () => {
    const fakeAProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(
      fakeAProductRepository,
    );
    const product = await createProduct.execute({
      title: 'Novo produto 1',
      type: 'acessorio eletronico',
      description: 'fone sem fio',
      filename: 'fone.jpg',
      height: 200,
      width:300,
      price: 45,
      rating: 3,
    });
    const findProduct = new FindProductService(
      fakeAProductRepository,
    );
    const productFind = await findProduct.execute({id: product.id});

    expect(productFind.id).toEqual(product.id);
  });
});
