import FakeAppointmentRepository from '../repositories/fakes/FakeProductRepository';
import UpdateProductService from './UpdateProductService';
import CreateProductService from './CreateProductService';

describe('UpdateProduct', () => {
  it('shold be able to update a product', async () => {
    const fakeAProductRepository = new FakeAppointmentRepository();
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
    const updateProduct = new UpdateProductService(
      fakeAProductRepository,
    );
    const productUpdate = await updateProduct.execute({
      id: product.id,
      title: 'Novo produto atualizado',
    });
    expect('Novo produto atualizado').toEqual(productUpdate.title)
  });
});
