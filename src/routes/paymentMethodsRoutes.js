import express from 'express';
import { getPaymentMethods, getPaymentMethod, addPaymentMethod, updatePaymentMethod, deletePaymentMethod } from '../controller/paymentMethodsController.js';


const paymentMethodsRouter = express.Router();



paymentMethodsRouter.get('/paymentMethods', getPaymentMethods);
paymentMethodsRouter.get('/paymentMethods/:id', getPaymentMethod);
paymentMethodsRouter.post('/paymentMethods', addPaymentMethod);
paymentMethodsRouter.put('/paymentMethods/:id', updatePaymentMethod);
paymentMethodsRouter.delete('/paymentMethods/:id', deletePaymentMethod);

export default paymentMethodsRouter;