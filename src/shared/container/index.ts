import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

container.registerSingleton<IAppointmentRepository>(
  'Appointments',
  AppointmentsRepository,
);
container.registerSingleton<IUsersRepository>('Users', UsersRepository);
