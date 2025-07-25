// models/invoicesModel.js
import dbClient from '../config/config.js';

class InvoicesModel {
  async getAll(tenantId, userRole) {
    let query = dbClient().from('invoices').select('*, bookings(booking_id), customers(name, email)');
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getById(id, tenantId, userRole) {
    let query = dbClient().from('invoices').select('*, bookings(booking_id), customers(name, email)').eq('id', id);
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  }

  async create(invoiceData, tenantId, userRole) {
    const finalTenantId = userRole === 'admin' && invoiceData.tenant_id ? invoiceData.tenant_id : tenantId;
    const { data, error } = await dbClient().from('invoices').insert([
      { ...invoiceData, tenant_id: finalTenantId }
    ]).select('*, bookings(booking_id), customers(name, email)');
    if (error) throw error;
    return data[0];
  }

  async update(id, invoiceData, tenantId, userRole) {
    invoiceData.updated_at = new Date().toISOString();
    let query = dbClient().from('invoices').update(invoiceData).eq('id', id);
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { data, error } = await query.select('*, bookings(booking_id), customers(name, email)');
    if (error) throw error;
    return data[0];
  }

  async delete(id, tenantId, userRole) {
    let query = dbClient().from('invoices').delete().eq('id', id);
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { error } = await query;
    if (error) throw error;
    return { message: 'Invoice deleted successfully' };
  }
}

export default new InvoicesModel();