import express from 'express';
const router = express.Router();
import db from '../models/index.js'; // Adjust if your path is different

router.post('/bookings', async (req, res) => {
  try {
    const { uid, name, phone, vehicle, dates } = req.body;

    const client = await db.clients.findOne({ where: { snippetCode: uid } });
    if (!client) return res.status(400).json({ error: "Invalid snippet UID" });

    await db.bookings.create({
      clientId: client.id,
      name,
      phone,
      vehicle,
      dates,
      source: "snippet",
    });

    res.status(200).json({ message: "Booking received" });
  } catch (err) {
    console.error("Snippet booking error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
