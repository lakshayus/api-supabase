// routes/vehicleCategoriesRoutes.js
import express from 'express';
import { getVehicleCategories, getVehicleCategory, addVehicleCategory, updateVehicleCategory, deleteVehicleCategory } from '../controller/vehicleCategoriesController.js';
// import { authenticateUser } from '../middleware/auth.js'; // Uncomment if you want to protect these endpoints (e.g., admin only)

const vehicleCategoriesRouter = express.Router();

// vehicleCategoriesRouter.use(authenticateUser); // Apply authentication if categories should be protected

vehicleCategoriesRouter.get('/vehicle-category', getVehicleCategories);
vehicleCategoriesRouter.get('/vehicle-category/:id', getVehicleCategory);
vehicleCategoriesRouter.post('/vehicle-category', addVehicleCategory);
vehicleCategoriesRouter.put('/vehicle-category/:id', updateVehicleCategory);
vehicleCategoriesRouter.delete('/vehicle-category/:id', deleteVehicleCategory);

export default vehicleCategoriesRouter;
