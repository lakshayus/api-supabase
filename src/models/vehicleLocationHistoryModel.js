// models/vehicleLocationHistoryModel.js
import dbClient from '../config/config.js'; // Correct import

class VehicleLocationHistoryModel {
  async getAll() {
    const { data, error } = await dbClient().from('vehicle_location_history').select('*, vehicles(model, make, license_plate)');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('vehicle_location_history').select('*, vehicles(model, make, license_plate)').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(locationData) {
    const { data, error } = await dbClient().from('vehicle_location_history').insert([locationData]).select('*, vehicles(model, make, license_plate)');
    if (error) throw error;
    return data[0];
  }

  async update(id, locationData) {
    const { data, error } = await dbClient().from('vehicle_location_history')
      .update(locationData)
      .eq('id', id)
      .select('*, vehicles(model, make, license_plate)');
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('vehicle_location_history').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Vehicle location history deleted successfully' };
  }
}

export default new VehicleLocationHistoryModel();