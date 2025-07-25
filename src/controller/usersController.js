// controllers/usersController.js
import usersModel from '../models/usersModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getUsers(req, res) {
  try {
    const users = await usersModel.getAll();
    res.json(users);
  } catch (err) {
    console.error("Error in getUsers controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getUser(req, res) {
  try {
    const user = await usersModel.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found or not in your tenant" });
    }
    res.json(user);
  } catch (err) {
    console.error(`Error in getUser controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addUser(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const userData = { ...req.body, tenant_id: tenantId };
    const newUser = await usersModel.create(userData);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error in addUser controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const updatedUser = await usersModel.update(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found or not in your tenant, or no changes made" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(`Error in updateUser controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    await usersModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteUser controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}