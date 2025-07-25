// yourController.js
import dbClient from "../config/config.js";

export async function getTenents(req, res) {
  try {
    const { data, error } = await dbClient().from('tenants').select('id,name,address,City,state,country,is_active,created_at,updated_at');
    if (error) {
      console.error("Error fetching tenants:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Unexpected error in getTenents:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTenent(req, res) {
  try {
    const { data, error } = await dbClient().from('tenants').select(`id,name,address,City,state,country, tenet_plans(plan_name),is_active,created_at,updated_at`).eq('id', req.params.id);
    if (error) {
      console.error(`Error fetching tenant with id ${req.params.id}:`, error);
      return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Tenant not found" });
    }
    res.json(data[0]); // Assuming 'eq' returns an array, and we expect only one result
  } catch (err) {
    console.error("Unexpected error in getTenent:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addTenent(req, res) {
  try {
    const { name, address, City, state, country, is_active } = req.body;
    const { data, error } = await dbClient().from('tenants').insert([
      { name, address, City, state, country, is_active }
    ]).select(); // .select() to return the inserted data

    if (error) {
      console.error("Error adding tenant:", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data[0]); // Return the newly created tenant
  } catch (err) {
    console.error("Unexpected error in addTenent:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateTenent(req, res) {
  try {
    const tenantId = req.params.id;
    const updates = req.body; // Expecting an object with fields to update

    // Add updated_at timestamp if not provided, or ensure it's current
    updates.updated_at = new Date().toISOString();

    const { data, error } = await dbClient().from('tenants')
      .update(updates)
      .eq('id', tenantId)
      .select(); // .select() to return the updated data

    if (error) {
      console.error(`Error updating tenant with id ${tenantId}:`, error);
      return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Tenant not found or no changes made" });
    }
    res.json(data[0]); // Return the updated tenant
  } catch (err) {
    console.error("Unexpected error in updateTenent:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteTenent(req, res) {
  try {
    const tenantId = req.params.id;
    const { error } = await dbClient().from('tenants')
      .delete()
      .eq('id', tenantId);

    if (error) {
      console.error(`Error deleting tenant with id ${tenantId}:`, error);
      return res.status(500).json({ error: error.message });
    }

    // Supabase delete doesn't return the deleted row, so we check if a row was affected
    // A common pattern is to fetch before deleting to ensure it exists, or just rely on the error object
    // For simplicity, we'll assume a successful delete if no error.
    res.status(204).send(); // No Content - successful deletion
  } catch (err) {
    console.error("Unexpected error in deleteTenent:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}