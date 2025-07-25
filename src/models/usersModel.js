// models/usersModel.js
import dbClient from '../config/config.js'; // Correct import

class UsersModel {
  async getAll() {
    const { data, error } = await dbClient().from('users').select('id,tenant_id,email,name,phone,membership,role_id,created_at,updated_at');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('users').select('id,tenant_id,email,name,phone,membership,role_id,created_at,updated_at').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(userData) {
    const { data, error } = await dbClient().from('users').insert([userData]).select('id,tenant_id,email,name,phone,membership,role_id,created_at,updated_at');
    if (error) throw error;
    return data[0];
  }

  async update(id, userData) {
    userData.updated_at = new Date().toISOString();
    const { data, error } = await dbClient().from('users')
      .update(userData)
      .eq('id', id)
      .select('id,tenant_id,email,name,phone,membership,role_id,created_at,updated_at');
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('users').delete().eq('id', id);
    if (error) throw error;
    return { message: 'User deleted successfully' };
  }
}

export default new UsersModel();