// controllers/bookingsController.js
import bookingsModel from '../models/bookingsModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getBookings(req, res) {
  try {
    const bookings = await bookingsModel.getAll();
    res.json(bookings);
  } catch (err) {
    console.error("Error in getBookings controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getBooking(req, res) {
  try {
    const booking = await bookingsModel.getById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found or not in your tenant" });
    }
    res.json(booking);
  } catch (err) {
    console.error(`Error in getBooking controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addBooking(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const bookingData = { ...req.body, tenant_id: tenantId };
    const newBooking = await bookingsModel.create(bookingData);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error in addBooking controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateBooking(req, res) {
  try {
    const updatedBooking = await bookingsModel.update(req.params.id, req.body);
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found or not in your tenant, or no changes made" });
    }
    res.json(updatedBooking);
  } catch (err) {
    console.error(`Error in updateBooking controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteBooking(req, res) {
  try {
    await bookingsModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteBooking controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}