import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(private dataSource: DataSource) {}

  async getDashboardStats() {
    const revenue = await this.dataSource.query(
      `SELECT SUM(amount) as total FROM payments WHERE status = 'completed'`
    );
    const bookings = await this.dataSource.query(
      `SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'`
    );
    const topBarbers = await this.dataSource.query(
      `SELECT b.first_name, COUNT(bk.id) as total_bookings 
       FROM users b 
       JOIN bookings bk ON b.id = bk.barber_id 
       GROUP BY b.id ORDER BY total_bookings DESC LIMIT 5`
    );

    return {
      totalRevenue: revenue[0].total || 0,
      totalBookings: bookings[0].count || 0,
      topBarbers,
    };
  }
}