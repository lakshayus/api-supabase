// controllers/customersController.js
import customersModel from '../models/customersModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getCustomers(req, res) {
  try {
    const customers = await customersModel.getAll();
    res.json(customers);
  } catch (err) {
    console.error("Error in getCustomers controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getCustomer(req, res) {
  try {
    const customer = await customersModel.getById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found or not in your tenant" });
    }
    res.json(customer);
  } catch (err) {
    console.error(`Error in getCustomer controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addCustomer(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const customerData = { ...req.body, tenant_id: tenantId };
    const newCustomer = await customersModel.create(customerData);
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error("Error in addCustomer controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateCustomer(req, res) {
  try {
    const updatedCustomer = await customersModel.update(req.params.id, req.body);
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found or not in your tenant, or no changes made" });
    }
    res.json(updatedCustomer);
  } catch (err) {
    console.error(`Error in updateCustomer controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteCustomer(req, res) {
  try {
    await customersModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteCustomer controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}