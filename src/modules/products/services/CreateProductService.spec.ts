import FakeAppointmentRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';

describe('CreateProduct', () => {
  it('shold be able to create a news products', async () => {
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
    expect(product).toHaveProperty('id');
  });
});
