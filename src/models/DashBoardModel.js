// models/dashboardModel.js
import dbClient from '../config/config.js';

class DashboardModel {
  // Helper to get start and end of week (Monday to Sunday)
  _getWeekDateRange(offsetWeeks = 0) {
    const now = new Date();
  
    const dayOfWeek = (now.getDay() + 6) % 7;

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek + (offsetWeeks * 7));
    startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get to Sunday
    endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day

    return { start: startOfWeek.toISOString(), end: endOfWeek.toISOString() };
  }

  async getDashboardStats(tenantId) {
    try {
      // --- Total Counts ---
      const { count: totalBookings, error: bookingsCountError } = await dbClient()
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId);
      if (bookingsCountError) throw bookingsCountError;

      const { count: totalCustomers, error: customersCountError } = await dbClient()
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId);
      if (customersCountError) throw customersCountError;

      // Determine the ID for 'Active' or 'Rented' status from vehicle_status table
      const { data: activeStatus, error: activeStatusError } = await dbClient()
        .from('vehicle_status')
        .select('id')
        .eq('name', 'Active') // Assuming 'Active' is the status name for active rentals
        .single();

      let totalActiveRentals = 0;
      if (activeStatus && activeStatus.id) {
        const { count: activeRentalsCount, error: activeRentalsCountError } = await dbClient()
          .from('vehicles')
          .select('*', { count: 'exact', head: true })
          .eq('tenant_id', tenantId)
          .eq('status', activeStatus.id); // Filter by the ID of 'Active' status
        if (activeRentalsCountError) throw activeRentalsCountError;
        totalActiveRentals = activeRentalsCount;
      } else if (activeStatusError) {
        console.warn("Could not find 'Active' status ID in vehicle_status table (for totalActiveRentals):", activeStatusError.message);
      }

      // --- Weekly Revenue & Bookings & Active Rentals ---
      const thisWeekRange = this._getWeekDateRange(0);
      const lastWeekRange = this._getWeekDateRange(-1);

      // This Week Revenue
      const { data: thisWeekInvoices, error: thisWeekInvoicesError } = await dbClient()
        .from('invoices')
        .select('total_amount')
        .eq('tenant_id', tenantId)
        .gte('issue_date', thisWeekRange.start)
        .lte('issue_date', thisWeekRange.end);
      if (thisWeekInvoicesError) throw thisWeekInvoicesError;
      const thisWeekRevenue = thisWeekInvoices.reduce((sum, invoice) => sum + parseFloat(invoice.total_amount), 0);

      // Last Week Revenue
      const { data: lastWeekInvoices, error: lastWeekInvoicesError } = await dbClient()
        .from('invoices')
        .select('total_amount')
        .eq('tenant_id', tenantId)
        .gte('issue_date', lastWeekRange.start)
        .lte('issue_date', lastWeekRange.end);
      if (lastWeekInvoicesError) throw lastWeekInvoicesError;
      const lastWeekRevenue = lastWeekInvoices.reduce((sum, invoice) => sum + parseFloat(invoice.total_amount), 0);

      // This Week Bookings Count (based on created_at)
      const { count: thisWeekBookingsCount, error: thisWeekBookingsCountError } = await dbClient()
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .gte('created_at', thisWeekRange.start)
        .lte('created_at', thisWeekRange.end);
      if (thisWeekBookingsCountError) throw thisWeekBookingsCountError;

      // Last Week Bookings Count (based on created_at)
      const { count: lastWeekBookingsCount, error: lastWeekBookingsCountError } = await dbClient()
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .gte('created_at', lastWeekRange.start)
        .lte('created_at', lastWeekRange.end);
      if (lastWeekBookingsCountError) throw lastWeekBookingsCountError;

      // This Week Active Rentals (count of bookings starting this week)
      const { count: thisWeekActiveRentalsCount, error: thisWeekActiveRentalsCountError } = await dbClient()
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .gte('start_time', thisWeekRange.start)
        .lte('start_time', thisWeekRange.end);
      if (thisWeekActiveRentalsCountError) throw thisWeekActiveRentalsCountError;

      // Last Week Active Rentals (count of bookings starting last week)
      const { count: lastWeekActiveRentalsCount, error: lastWeekActiveRentalsCountError } = await dbClient()
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .gte('start_time', lastWeekRange.start)
        .lte('start_time', lastWeekRange.end);
      if (lastWeekActiveRentalsCountError) throw lastWeekActiveRentalsCountError;


      return {
        totalBookings,
        thisWeekBookings: thisWeekBookingsCount,
        lastWeekBookings: lastWeekBookingsCount,
        totalCustomers,
        totalActiveRentals, // This is current count of vehicles with 'Active' status
        thisWeekActiveRentals: thisWeekActiveRentalsCount, // Bookings started this week
        lastWeekActiveRentals: lastWeekActiveRentalsCount,
        thisWeekRevenue: parseFloat(thisWeekRevenue.toFixed(2)),
        lastWeekRevenue: parseFloat(lastWeekRevenue.toFixed(2)),
        
         // Bookings started last week
      };

    } catch (error) {
      console.error("Error in getDashboardStats model:", error);
      throw error;
    }
  }
}

export default new DashboardModel();