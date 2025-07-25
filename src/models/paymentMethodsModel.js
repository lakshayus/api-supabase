// models/paymentMethodsModel.js
import dbClient from '../config/config.js';

class PaymentMethodsModel {
  async getAll(tenantId, userRole) {
    let query = dbClient().from('payment_methods').select('*, customers(name, email)');
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getById(id, tenantId, userRole) {
    let query = dbClient().from('payment_methods').select('*, customers(name, email)').eq('id', id);
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  }

  async create(paymentMethodData, tenantId, userRole) {
    const finalTenantId = userRole === 'admin' && paymentMethodData.tenant_id ? paymentMethodData.tenant_id : tenantId;
    const { data, error } = await dbClient().from('payment_methods').insert([
      { ...paymentMethodData, tenant_id: finalTenantId }
    ]).select('*, customers(name, email)');
    if (error) throw error;
    return data[0];
  }

  async update(id, paymentMethodData, tenantId, userRole) {
    paymentMethodData.updated_at = new Date().toISOString();
    let query = dbClient().from('payment_methods').update(paymentMethodData).eq('id', id);
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { data, error } = await query.select('*, customers(name, email)');
    if (error) throw error;
    return data[0];
  }

  async delete(id, tenantId, userRole) {
    let query = dbClient().from('payment_methods').delete().eq('id', id);
    if (userRole !== 'admin') {
      query = query.eq('tenant_id', tenantId);
    }
    const { error } = await query;
    if (error) throw error;
    return { message: 'Payment method deleted successfully' };
  }
}

export default new PaymentMethodsModel();