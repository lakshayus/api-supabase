import express from 'express';
import { getBookings, getBooking, addBooking, updateBooking, deleteBooking } from '../controller/bookingsController.js';


const bookingsRouter = express.Router();



bookingsRouter.get('/booking', getBookings);
bookingsRouter.get('/booking/:id', getBooking);
bookingsRouter.post('/booking', addBooking);
bookingsRouter.put('/booking/:id', updateBooking);
bookingsRouter.delete('/booking/:id', deleteBooking);

export default bookingsRouter;