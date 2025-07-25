// controllers/vehicleCategoriesController.js
import vehicleCategoriesModel from '../models/vehicleCategoriesModel.js';

export async function getVehicleCategories(req, res) {
  try {
    const categories = await vehicleCategoriesModel.getAll();
    res.json(categories);
  } catch (err) {
    console.error("Error in getVehicleCategories controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getVehicleCategory(req, res) {
  try {
    const category = await vehicleCategoriesModel.getById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Vehicle category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(`Error in getVehicleCategory controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addVehicleCategory(req, res) {
  try {
    const newCategory = await vehicleCategoriesModel.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error in addVehicleCategory controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateVehicleCategory(req, res) {
  try {
    const updatedCategory = await vehicleCategoriesModel.update(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ error: "Vehicle category not found or no changes made" });
    }
    res.json(updatedCategory);
  } catch (err) {
    console.error(`Error in updateVehicleCategory controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteVehicleCategory(req, res) {
  try {
    await vehicleCategoriesModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteVehicleCategory controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}