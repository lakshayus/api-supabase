// routes/customersRoutes.js
import express from 'express';
import { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer } from '../controller/customersController.js';


const customersRouter = express.Router();



customersRouter.get('/customer', getCustomers);
customersRouter.get('/customer/:id', getCustomer);
customersRouter.post('/customer', addCustomer);
customersRouter.put('/customer/:id', updateCustomer);
customersRouter.delete('/customer/:id', deleteCustomer);

export default customersRouter;
