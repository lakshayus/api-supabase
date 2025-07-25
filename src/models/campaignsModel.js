// models/campaignsModel.js
import dbClient from '../config/config.js'; // Correct import

class CampaignsModel {
  async getAll() {
    const { data, error } = await dbClient().from('campaigns').select('*');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('campaigns').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(campaignData) {
    const { data, error } = await dbClient().from('campaigns').insert([campaignData]).select();
    if (error) throw error;
    return data[0];
  }

  async update(id, campaignData) {
    const { data, error } = await dbClient().from('campaigns')
      .update(campaignData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('campaigns').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Campaign deleted successfully' };
  }
}

export default new CampaignsModel();