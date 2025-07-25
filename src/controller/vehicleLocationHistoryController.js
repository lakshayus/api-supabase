// controllers/vehicleLocationHistoryController.js
import vehicleLocationHistoryModel from '../models/vehicleLocationHistoryModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getVehicleLocationHistories(req, res) {
  try {
    const histories = await vehicleLocationHistoryModel.getAll();
    res.json(histories);
  } catch (err) {
    console.error("Error in getVehicleLocationHistories controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getVehicleLocationHistory(req, res) {
  try {
    const history = await vehicleLocationHistoryModel.getById(req.params.id);
    if (!history) {
      return res.status(404).json({ error: "Vehicle location history not found or not in your tenant" });
    }
    res.json(history);
  } catch (err) {
    console.error(`Error in getVehicleLocationHistory controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addVehicleLocationHistory(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const locationData = { ...req.body, tenant_id: tenantId };
    const newLocation = await vehicleLocationHistoryModel.create(locationData);
    res.status(201).json(newLocation);
  } catch (err) {
    console.error("Error in addVehicleLocationHistory controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateVehicleLocationHistory(req, res) {
  try {
    const updatedLocation = await vehicleLocationHistoryModel.update(req.params.id, req.body);
    if (!updatedLocation) {
      return res.status(404).json({ error: "Vehicle location history not found or not in your tenant, or no changes made" });
    }
    res.json(updatedLocation);
  } catch (err) {
    console.error(`Error in updateVehicleLocationHistory controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteVehicleLocationHistory(req, res) {
  try {
    await vehicleLocationHistoryModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteVehicleLocationHistory controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}