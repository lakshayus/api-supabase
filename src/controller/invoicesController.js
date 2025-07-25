// controllers/invoicesController.js
import invoicesModel from '../models/invoicesModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getInvoices(req, res) {
  try {
    const invoices = await invoicesModel.getAll();
    res.json(invoices);
  } catch (err) {
    console.error("Error in getInvoices controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getInvoice(req, res) {
  try {
    const invoice = await invoicesModel.getById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found or not in your tenant" });
    }
    res.json(invoice);
  } catch (err) {
    console.error(`Error in getInvoice controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addInvoice(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const invoiceData = { ...req.body, tenant_id: tenantId };
    const newInvoice = await invoicesModel.create(invoiceData);
    res.status(201).json(newInvoice);
  } catch (err) {
    console.error("Error in addInvoice controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateInvoice(req, res) {
  try {
    const updatedInvoice = await invoicesModel.update(req.params.id, req.body);
    if (!updatedInvoice) {
      return res.status(404).json({ error: "Invoice not found or not in your tenant, or no changes made" });
    }
    res.json(updatedInvoice);
  } catch (err) {
    console.error(`Error in updateInvoice controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteInvoice(req, res) {
  try {
    await invoicesModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteInvoice controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}