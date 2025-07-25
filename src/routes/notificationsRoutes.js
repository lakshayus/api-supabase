import express from 'express';
import { getNotifications, getNotification, addNotification, updateNotification, deleteNotification } from '../controller/notificationsController.js';

const notificationsRouter = express.Router();

notificationsRouter.get('/notifications', getNotifications);
notificationsRouter.get('/notifications/:id', getNotification);
notificationsRouter.post('/notifications', addNotification);
notificationsRouter.put('/notifications/:id', updateNotification);
notificationsRouter.delete('/notifications/:id', deleteNotification);

export default notificationsRouter;