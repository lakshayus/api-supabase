// controllers/messagesController.js
import messagesModel from '../models/messagesModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getMessages(req, res) {
  try {
    const messages = await messagesModel.getAll();
    res.json(messages);
  } catch (err) {
    console.error("Error in getMessages controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getMessage(req, res) {
  try {
    const message = await messagesModel.getById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found or not in your tenant" });
    }
    res.json(message);
  } catch (err) {
    console.error(`Error in getMessage controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addMessage(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const messageData = { ...req.body, tenant_id: tenantId };
    const newMessage = await messagesModel.create(messageData);
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error in addMessage controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateMessage(req, res) {
  try {
    const updatedMessage = await messagesModel.update(req.params.id, req.body);
    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found or not in your tenant, or no changes made" });
    }
    res.json(updatedMessage);
  } catch (err) {
    console.error(`Error in updateMessage controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteMessage(req, res) {
  try {
    await messagesModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteMessage controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}