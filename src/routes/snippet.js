
import express from 'express';
const router = express.Router();


import db from '../models/index.js';

router.post('/submit-booking', async (req, res) => {
  try {
    const { name, phone, vehicle, pickupDate, dropDate, clientId } = req.body;

    if (!clientId || !name || !phone || !vehicle) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    
    await db.Booking.create({
      name,
      phone,
      vehicle,
      pickupDate,
      dropDate,
      clientId
    });

    res.status(200).json({ message: "Booking received successfully" });
  } catch (error) {
    console.error("Snippet Booking Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
