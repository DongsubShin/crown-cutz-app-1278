"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/users/user.module");
const barber_module_1 = require("./modules/barbers/barber.module");
const service_module_1 = require("./modules/services/service.module");
const booking_module_1 = require("./modules/bookings/booking.module");
const client_module_1 = require("./modules/clients/client.module");
const queue_module_1 = require("./modules/queue/queue.module");
const loyalty_module_1 = require("./modules/loyalty/loyalty.module");
const notification_module_1 = require("./modules/notifications/notification.module");
const finance_module_1 = require("./modules/finance/finance.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: process.env.NODE_ENV !== 'production',
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            barber_module_1.BarberModule,
            service_module_1.ServiceModule,
            booking_module_1.BookingModule,
            client_module_1.ClientModule,
            queue_module_1.QueueModule,
            loyalty_module_1.LoyaltyModule,
            notification_module_1.NotificationModule,
            finance_module_1.FinanceModule,
            analytics_module_1.AnalyticsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map