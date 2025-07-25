// routes/usersRoutes.js
import express from 'express';
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controller/usersController.js';
 // This is essential for tenant_id filtering

const usersRouter = express.Router();



usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUser);
usersRouter.post('/users', addUser);
usersRouter.put('/users/:id', updateUser);
usersRouter.delete('/users/:id', deleteUser);

export default usersRouter;
