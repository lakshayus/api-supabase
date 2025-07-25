import express from 'express';
import {getTenents} from '../controller/tenentController.js'

const tenantRouter = express.Router();

tenantsRouter.get('/tenant', getTenents);

export default tenantsRouter;
