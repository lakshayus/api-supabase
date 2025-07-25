// controllers/paymentMethodsController.js
import paymentMethodsModel from '../models/paymentMethodsModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getPaymentMethods(req, res) {
  try {
    const paymentMethods = await paymentMethodsModel.getAll();
    res.json(paymentMethods);
  } catch (err) {
    console.error("Error in getPaymentMethods controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getPaymentMethod(req, res) {
  try {
    const paymentMethod = await paymentMethodsModel.getById(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ error: "Payment method not found or not in your tenant" });
    }
    res.json(paymentMethod);
  } catch (err) {
    console.error(`Error in getPaymentMethod controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addPaymentMethod(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const paymentMethodData = { ...req.body, tenant_id: tenantId };
    const newPaymentMethod = await paymentMethodsModel.create(paymentMethodData);
    res.status(201).json(newPaymentMethod);
  } catch (err) {
    console.error("Error in addPaymentMethod controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updatePaymentMethod(req, res) {
  try {
    const updatedPaymentMethod = await paymentMethodsModel.update(req.params.id, req.body);
    if (!updatedPaymentMethod) {
      return res.status(404).json({ error: "Payment method not found or not in your tenant, or no changes made" });
    }
    res.json(updatedPaymentMethod);
  } catch (err) {
    console.error(`Error in updatePaymentMethod controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deletePaymentMethod(req, res) {
  try {
    await paymentMethodsModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deletePaymentMethod controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}