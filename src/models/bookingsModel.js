// models/bookingsModel.js
import dbClient from '../config/config.js';

class BookingsModel {
  async getAll(tenantId, userRole) {
    let query = dbClient().from('bookings').select('*, customers(name, email), vehicles(model, make, license_plate)');
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getById(id, tenantId, userRole) {
    let query = dbClient().from('bookings').select('*, customers(name, email), vehicles(model, make, license_plate)').eq('id', id);
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  }

  async create(bookingData, tenantId, userRole) {
    // If admin explicitly provides tenant_id in bookingData, use that. Otherwise, use the authenticated user's tenantId.
    const finalTenantId = userRole === 'admin' && bookingData.tenant_id ? bookingData.tenant_id : tenantId;
    const { data, error } = await dbClient().from('bookings').insert([
      { ...bookingData, tenant_id: finalTenantId }
    ]).select('*, customers(name, email), vehicles(model, make, license_plate)');
    if (error) throw error;
    return data[0];
  }

  async update(id, bookingData, tenantId, userRole) {
    bookingData.updated_at = new Date().toISOString();
    let query = dbClient().from('bookings').update(bookingData).eq('id', id);
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { data, error } = await query.select('*, customers(name, email), vehicles(model, make, license_plate)');
    if (error) throw error;
    return data[0];
  }

  async delete(id, tenantId, userRole) {
    let query = dbClient().from('bookings').delete().eq('id', id);
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { error } = await query;
    if (error) throw error;
    return { message: 'Booking deleted successfully' };
  }
}

export default new BookingsModel();