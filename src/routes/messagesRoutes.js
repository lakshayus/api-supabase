import express from 'express';
import { getMessages, getMessage, addMessage, updateMessage, deleteMessage } from '../controller/messagesController.js';
const messagesRouter = express.Router();

messagesRouter.get('/messages', getMessages);
messagesRouter.get('/messages/:id', getMessage);
messagesRouter.post('/messages', addMessage);
messagesRouter.put('/messages/:id', updateMessage);
messagesRouter.delete('/messages/:id', deleteMessage);

export default messagesRouter;