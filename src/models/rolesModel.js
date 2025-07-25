// models/rolesModel.js
import dbClient from '../config/config.js'; // Correct import

class RolesModel {
  async getAll() {
    const { data, error } = await dbClient().from('roles').select('*');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('roles').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(roleData) {
    const { data, error } = await dbClient().from('roles').insert([roleData]).select();
    if (error) throw error;
    return data[0];
  }

  async update(id, roleData) {
    const { data, error } = await dbClient().from('roles').update(roleData).eq('id', id).select();
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('roles').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Role deleted successfully' };
  }
}

export default new RolesModel();