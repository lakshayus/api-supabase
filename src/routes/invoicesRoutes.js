import express from 'express';
import { getInvoices, getInvoice, addInvoice, updateInvoice, deleteInvoice } from '../controller/invoicesController.js';


const invoicesRouter = express.Router();



invoicesRouter.get('/invoices', getInvoices);
invoicesRouter.get('/invoices/:id', getInvoice);
invoicesRouter.post('/invoices', addInvoice);
invoicesRouter.put('/invoices/:id', updateInvoice);
invoicesRouter.delete('/invoices/:id', deleteInvoice);

export default invoicesRouter;