import express from 'express';
import { getVehicleLocationHistories, getVehicleLocationHistory, addVehicleLocationHistory, updateVehicleLocationHistory, deleteVehicleLocationHistory } from '../controller/vehicleLocationHistoryController.js';
import { authenticateUser } from '../middleware/auth.js';

const vehicleLocationHistoryRouter = express.Router();



vehicleLocationHistoryRouter.get('/vehicle-location-history', getVehicleLocationHistories);
vehicleLocationHistoryRouter.get('/vehicle-location-history/:id', getVehicleLocationHistory);
vehicleLocationHistoryRouter.post('/vehicle-location-history', addVehicleLocationHistory);
vehicleLocationHistoryRouter.put('/vehicle-location-history/:id', updateVehicleLocationHistory);
vehicleLocationHistoryRouter.delete('/vehicle-location-history/:id', deleteVehicleLocationHistory);

export default vehicleLocationHistoryRouter;