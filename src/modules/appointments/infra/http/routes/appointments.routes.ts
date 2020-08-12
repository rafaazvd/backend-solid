import { Router } from 'express';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsControllers from '../controllers/ApointementsControllers';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
const appointmentsControllers = new AppointmentsControllers();

/* appointmentsRouter.get('/', async (req, res) => {
  const appointments = await appointmentsRepository.find();
  console.log(req.user);
  return res.json(appointments);
}); */

appointmentsRouter.post('/', appointmentsControllers.create);

export default appointmentsRouter;
