// controllers/notificationsController.js
import notificationsModel from '../models/notificationsModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getNotifications(req, res) {
  try {
    const notifications = await notificationsModel.getAll();
    res.json(notifications);
  } catch (err) {
    console.error("Error in getNotifications controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getNotification(req, res) {
  try {
    const notification = await notificationsModel.getById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found or not in your tenant" });
    }
    res.json(notification);
  } catch (err) {
    console.error(`Error in getNotification controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addNotification(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const notificationData = { ...req.body, tenant_id: tenantId };
    const newNotification = await notificationsModel.create(notificationData);
    res.status(201).json(newNotification);
  } catch (err) {
    console.error("Error in addNotification controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateNotification(req, res) {
  try {
    const updatedNotification = await notificationsModel.update(req.params.id, req.body);
    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found or not in your tenant, or no changes made" });
    }
    res.json(updatedNotification);
  } catch (err) {
    console.error(`Error in updateNotification controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteNotification(req, res) {
  try {
    await notificationsModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteNotification controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}