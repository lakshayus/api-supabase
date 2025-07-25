import express from 'express';
import { getVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle } from '../controller/vehiclesController.js';
import { authenticateUser } from '../middleware/auth.js';

const vehiclesRouter = express.Router();



vehiclesRouter.get('/vehicles', getVehicles);
vehiclesRouter.get('/vehicles/:id', getVehicle);
vehiclesRouter.post('/vehicles', addVehicle);
vehiclesRouter.put('/vehicles/:id', updateVehicle);
vehiclesRouter.delete('/vehicles/:id', deleteVehicle);

export default vehiclesRouter;