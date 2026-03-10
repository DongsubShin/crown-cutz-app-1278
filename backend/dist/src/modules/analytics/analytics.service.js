"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AnalyticsService = class AnalyticsService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getDashboardStats() {
        const revenue = await this.dataSource.query(`SELECT SUM(amount) as total FROM payments WHERE status = 'completed'`);
        const bookings = await this.dataSource.query(`SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'`);
        const topBarbers = await this.dataSource.query(`SELECT b.first_name, COUNT(bk.id) as total_bookings 
       FROM users b 
       JOIN bookings bk ON b.id = bk.barber_id 
       GROUP BY b.id ORDER BY total_bookings DESC LIMIT 5`);
        return {
            totalRevenue: revenue[0].total || 0,
            totalBookings: bookings[0].count || 0,
            topBarbers,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map