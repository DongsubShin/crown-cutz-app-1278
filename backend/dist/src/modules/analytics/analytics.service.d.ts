import { DataSource } from 'typeorm';
export declare class AnalyticsService {
    private dataSource;
    constructor(dataSource: DataSource);
    getDashboardStats(): Promise<{
        totalRevenue: any;
        totalBookings: any;
        topBarbers: any;
    }>;
}
