// models/usersModel.js
import dbClient from '../config/config.js'; // Correct import

class AuthModel {
  async login(email) {
    const { data, error } = await dbClient().from('users').select(`id,
      tenants(id,name),email,name,password,phone,membership,roles(id,name),created_at,updated_at`)
      .eq('email', email)
      
    if (error) throw error;
    return data;
  }

  async register(email,password,name,phone,membership,role_id,tenant_id){
    const { data, error } = await dbClient().from('users').insert({email,password,name,phone,membership,role_id,tenant_id})
    if (error) throw error;
    return data;
  }
}



export default new AuthModel();