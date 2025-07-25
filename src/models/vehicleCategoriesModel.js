// models/vehicleCategoriesModel.js
import dbClient from '../config/config.js'; // Correct import

class VehicleCategoriesModel {
  async getAll() {
    const { data, error } = await dbClient().from('vehicle_categories').select('*');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('vehicle_categories').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(categoryData) {
    const { data, error } = await dbClient().from('vehicle_categories').insert([categoryData]).select();
    if (error) throw error;
    return data[0];
  }

  async update(id, categoryData) {
    const { data, error } = await dbClient().from('vehicle_categories').update(categoryData).eq('id', id).select();
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('vehicle_categories').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Vehicle category deleted successfully' };
  }
}

export default new VehicleCategoriesModel();