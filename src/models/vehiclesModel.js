// models/vehiclesModel.js
import dbClient from '../config/config.js'; // Correct import

class VehiclesModel {
  async getAll() {
    const { data, error } = await dbClient().from('vehicles').select('*, vehicle_categories(name), vehicle_status(name)');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('vehicles').select('*, vehicle_categories(name), vehicle_status(name)').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(vehicleData) {
    const { data, error } = await dbClient().from('vehicles').insert([vehicleData]).select('*, vehicle_categories(name), vehicle_status(name)');
    if (error) throw error;
    return data[0];
  }

  async update(id, vehicleData) {
    vehicleData.updated_at = new Date().toISOString();
    const { data, error } = await dbClient().from('vehicles')
      .update(vehicleData)
      .eq('id', id)
      .select('*, vehicle_categories(name), vehicle_status(name)');
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('vehicles').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Vehicle deleted successfully' };
  }
}

export default new VehiclesModel();