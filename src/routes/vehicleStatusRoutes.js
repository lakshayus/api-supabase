import express from 'express';
import { getVehicleStatuses, getVehicleStatus, addVehicleStatus, updateVehicleStatus, deleteVehicleStatus } from '../controller/vehicleStatusController.js';

const vehicleStatusRouter = express.Router();

vehicleStatusRouter.get('/vehicle-status', getVehicleStatuses);
vehicleStatusRouter.get('/vehicle-status/:id', getVehicleStatus);
vehicleStatusRouter.post('/vehicle-status', addVehicleStatus);
vehicleStatusRouter.put('/vehicle-status/:id', updateVehicleStatus);
vehicleStatusRouter.delete('/vehicle-status/:id', deleteVehicleStatus);

export default vehicleStatusRouter;