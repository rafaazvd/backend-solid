import AppError from '../../../shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('shold be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234567',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567');
  });

  it('should not be able to create two apppointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    await createAppointment.execute({
      date: new Date(),
      provider_id: '1234567',
    });
    await expect(
      createAppointment.execute({
        date: new Date(),
        provider_id: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
