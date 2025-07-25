// models/messagesModel.js
import dbClient from '../config/config.js'; // Correct import

class MessagesModel {
  async getAll() {
    const { data, error } = await dbClient().from('messages').select('*, sender:sender_id(email, name), receiver:receiver_id(email, name)');
    if (error) throw error;
    return data;
  }

  async getById(id) {
    const { data, error } = await dbClient().from('messages').select('*, sender:sender_id(email, name), receiver:receiver_id(email, name)').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(messageData) {
    const { data, error } = await dbClient().from('messages').insert([messageData]).select('*, sender:sender_id(email, name), receiver:receiver_id(email, name)');
    if (error) throw error;
    return data[0];
  }

  async update(id, messageData) {
    const { data, error } = await dbClient().from('messages')
      .update(messageData)
      .eq('id', id)
      .select('*, sender:sender_id(email, name), receiver:receiver_id(email, name)');
    if (error) throw error;
    return data[0];
  }

  async delete(id) {
    const { error } = await dbClient().from('messages').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Message deleted successfully' };
  }
}

export default new MessagesModel();