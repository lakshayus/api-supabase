// models/vehicleStatusModel.js
import dbClient from '../config/config.js'; // Correct import

class VehicleStatusModel {
  async getAll() {
    const { data, error } = await dbClient().from('vehicle_status').select('*');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('vehicle_status').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(statusData) {
    const { data, error } = await dbClient().from('vehicle_status').insert([statusData]).select();
    if (error) throw error;
    return data[0];
  }

  async update(id, statusData) {
    const { data, error } = await dbClient().from('vehicle_status').update(statusData).eq('id', id).select();
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('vehicle_status').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Vehicle status deleted successfully' };
  }
}

export default new VehicleStatusModel();