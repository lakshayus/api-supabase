// models/customersModel.js
import dbClient from '../config/config.js'; // Correct import

class CustomersModel {
  async getAll() {
    const { data, error } = await dbClient().from('customers').select('id,tenant_id,email,name,phone,membership,segment,user_id,created_at,updated_at');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('customers').select('id,tenant_id,email,name,phone,membership,segment,user_id,created_at,updated_at').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(customerData) {
    const { data, error } = await dbClient().from('customers').insert([customerData]).select('id,tenant_id,email,name,phone,membership,segment,user_id,created_at,updated_at');
    if (error) throw error;
    return data[0];
  }

  async update(id, customerData) {
    customerData.updated_at = new Date().toISOString();
    const { data, error } = await dbClient().from('customers')
      .update(customerData)
      .eq('id', id)
      .select('id,tenant_id,email,name,phone,membership,segment,user_id,created_at,updated_at');
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('customers').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Customer deleted successfully' };
  }
}

export default new CustomersModel();