import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';

export default class AppointementsControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id: provider,
      date: parsedDate,
    });
    return res.json(appointment);
  }
}
