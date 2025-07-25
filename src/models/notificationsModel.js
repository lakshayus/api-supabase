// models/notificationsModel.js
import dbClient from '../config/config.js'; // Correct import

class NotificationsModel {
  async getAll() {
    const { data, error } = await dbClient().from('notifications').select('*, users(email, name)');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('notifications').select('*, users(email, name)').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(notificationData) {
    const { data, error } = await dbClient().from('notifications').insert([notificationData]).select('*, users(email, name)');
    if (error) throw error;
    return data[0];
  }

  async update(id, notificationData) {
    const { data, error } = await dbClient().from('notifications')
      .update(notificationData)
      .eq('id', id)
      .select('*, users(email, name)');
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('notifications').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Notification deleted successfully' };
  }
}

export default new NotificationsModel();