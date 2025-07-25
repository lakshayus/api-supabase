// routes/rolesRoutes.js
import express from 'express';
import { getRoles, getRole, addRole, updateRole, deleteRole } from '../controller/roesController.js';
// import { authenticateUser } from '../middleware/auth.js'; // Uncomment if you want to protect roles endpoints

const rolesRouter = express.Router();

// rolesRouter.use(authenticateUser); // Apply authentication to all roles routes if needed

rolesRouter.get('/roles', getRoles);
rolesRouter.get('/roles/:id', getRole);
rolesRouter.post('/roles', addRole);
rolesRouter.put('/roles/:id', updateRole);
rolesRouter.delete('/roles/:id', deleteRole);

export default rolesRouter;