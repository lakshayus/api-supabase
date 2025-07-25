// controllers/campaignsController.js
import campaignsModel from '../models/campaignsModel.js';
import { getTenantIdFromRequest } from '../middleware/auth.js';

export async function getCampaigns(req, res) {
  try {
    const campaigns = await campaignsModel.getAll();
    res.json(campaigns);
  } catch (err) {
    console.error("Error in getCampaigns controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function getCampaign(req, res) {
  try {
    const campaign = await campaignsModel.getById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found or not in your tenant" });
    }
    res.json(campaign);
  } catch (err) {
    console.error(`Error in getCampaign controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function addCampaign(req, res) {
  try {
    const tenantId = getTenantIdFromRequest(req);
    const campaignData = { ...req.body, tenant_id: tenantId };
    const newCampaign = await campaignsModel.create(campaignData);
    res.status(201).json(newCampaign);
  } catch (err) {
    console.error("Error in addCampaign controller:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function updateCampaign(req, res) {
  try {
    const updatedCampaign = await campaignsModel.update(req.params.id, req.body);
    if (!updatedCampaign) {
      return res.status(404).json({ error: "Campaign not found or not in your tenant, or no changes made" });
    }
    res.json(updatedCampaign);
  } catch (err) {
    console.error(`Error in updateCampaign controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}

export async function deleteCampaign(req, res) {
  try {
    await campaignsModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(`Error in deleteCampaign controller for id ${req.params.id}:`, err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}