// controllers/vehicleStatusController.js
import vehicleStatusModel from '../models/vehicleStatusModel.js';

export async function getVehicleStatuses(req, res) {
  try {
    const statuses = await vehicleStatusModel.getAll();
    res.json(statuses);
  } catch (err) {
    console.error("Error in getVehicleStatuses controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getVehicleStatus(req, res) {
  try {
    const status = await vehicleStatusModel.getById(req.params.id);
    if (!status) {
      return res.status(404).json({ error: "Vehicle status not found" });
    }
    res.json(status);
  } catch (err) {
    console.error(`Error in getVehicleStatus controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addVehicleStatus(req, res) {
  try {
    const newStatus = await vehicleStatusModel.create(req.body);
    res.status(201).json(newStatus);
  } catch (err) {
    console.error("Error in addVehicleStatus controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateVehicleStatus(req, res) {
  try {
    const updatedStatus = await vehicleStatusModel.update(req.params.id, req.body);
    if (!updatedStatus) {
      return res.status(404).json({ error: "Vehicle status not found or no changes made" });
    }
    res.json(updatedStatus);
  } catch (err) {
    console.error(`Error in updateVehicleStatus controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteVehicleStatus(req, res) {
  try {
    await vehicleStatusModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteVehicleStatus controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}