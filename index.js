// app.js (Main Application File - ES6)

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import bookingsRouter from './src/routes/bookingsRoutes.js';
import campaignsRouter from './src/routes/campaignsRoutes.js';
import customersRouter from './src/routes/customersRoutes.js';
import invoicesRouter from './src/routes/invoicesRoutes.js';
import messagesRouter from './src/routes/messagesRoutes.js';
import notificationsRouter from './src/routes/notificationsRoutes.js';
import paymentMethodsRouter from './src/routes/paymentMethodsRoutes.js';
import rolesRouter from './src/routes/rolesRoutes.js';
//import tenantRouter from './src/routes/tenantRouter.js';
import usersRouter from './src/routes/usersRoutes.js';
import vehicleCategoriesRouter  from './src/routes/vehicleCategoriesRoutes.js';
import vehicleLocationHistoryRouter from './src/routes/vehicleLocationHistoryRoutes.js';
import vehiclesRouter from './src/routes/vehiclesRoutes.js';
import vehicleStatusRouter from './src/routes/vehicleStatusRoutes.js';
import authRouter from './src/routes/authRouter.js'
import snippetRoutes from './src/routes/snippet.js';



dotenv.config()

const app = express();
const port = 3000;
// Middleware to parse JSON bodies (if you were handling POST/PUT requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use("/api",authRouter);
app.use("/api",bookingsRouter);
app.use("/api",campaignsRouter);
//app.use("/api",tenantRouter);
app.use("/api",customersRouter);
app.use("/api",invoicesRouter);
app.use("/api",messagesRouter);
app.use("/api",notificationsRouter);
app.use("/api",paymentMethodsRouter);
app.use("/api",rolesRouter);
app.use("/api",usersRouter);
app.use("/api",vehicleCategoriesRouter);
app.use("/api",vehicleLocationHistoryRouter);
app.use("/api",vehiclesRouter);
app.use("/api",vehicleStatusRouter);
app.use('/api/snippet', snippetRoutes);

// Basic route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the  App! ');
});


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
 
});

