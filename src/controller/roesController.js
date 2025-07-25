// controllers/rolesController.js
import rolesModel from '../models/rolesModel.js';

export async function getRoles(req, res) {
  try {
    const roles = await rolesModel.getAll();
    res.json(roles);
  } catch (err) {
    console.error("Error in getRoles controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getRole(req, res) {
  try {
    const role = await rolesModel.getById(req.params.id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.json(role);
  } catch (err) {
    console.error(`Error in getRole controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addRole(req, res) {
  try {
    const newRole = await rolesModel.create(req.body);
    res.status(201).json(newRole);
  } catch (err) {
    console.error("Error in addRole controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateRole(req, res) {
  try {
    const updatedRole = await rolesModel.update(req.params.id, req.body);
    if (!updatedRole) {
      return res.status(404).json({ error: "Role not found or no changes made" });
    }
    res.json(updatedRole);
  } catch (err) {
    console.error(`Error in updateRole controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteRole(req, res) {
  try {
    await rolesModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteRole controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}