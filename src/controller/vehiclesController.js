// controllers/vehiclesController.js
import vehiclesModel from '../models/vehiclesModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getVehicles(req, res) {
  try {
    const vehicles = await vehiclesModel.getAll();
    res.json(vehicles);
  } catch (err) {
    console.error("Error in getVehicles controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getVehicle(req, res) {
  try {
    const vehicle = await vehiclesModel.getById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found or not in your tenant" });
    }
    res.json(vehicle);
  } catch (err) {
    console.error(`Error in getVehicle controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addVehicle(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const vehicleData = { ...req.body, tenant_id: tenantId };
    const newVehicle = await vehiclesModel.create(vehicleData);
    res.status(201).json(newVehicle);
  } catch (err) {
    console.error("Error in addVehicle controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateVehicle(req, res) {
  try {
    const updatedVehicle = await vehiclesModel.update(req.params.id, req.body);
    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehicle not found or not in your tenant, or no changes made" });
    }
    res.json(updatedVehicle);
  } catch (err) {
    console.error(`Error in updateVehicle controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteVehicle(req, res) {
  try {
    await vehiclesModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteVehicle controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}