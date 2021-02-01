import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import DeleteProductService from './DeleteProductService';
import CreateProductService from './CreateProductService';
import { id } from 'date-fns/locale';

describe('DeleteProduct', () => {
  it('shold be able to delete a product', async () => {
    const fakeAProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(
      fakeAProductRepository,
    );
    const product = await createProduct.execute({
      title: 'Novo produto',
      type: 'acessorio eletronico',
      description: 'fone sem fio',
      filename: 'fone.jpg',
      height: 200,
      width:300,
      price: 45,
      rating: 3,
    });
    const deleteProduct = new DeleteProductService(
      fakeAProductRepository,
    );
    await deleteProduct.execute({
      id: product.id,
    });
    const findProduct = await fakeAProductRepository.findOne(product.id);
    expect(findProduct).toBeUndefined();
  });
});
