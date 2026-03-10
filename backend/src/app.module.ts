import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { BarberModule } from './modules/barbers/barber.module';
import { ServiceModule } from './modules/services/service.module';
import { BookingModule } from './modules/bookings/booking.module';
import { ClientModule } from './modules/clients/client.module';
import { QueueModule } from './modules/queue/queue.module';
import { LoyaltyModule } from './modules/loyalty/loyalty.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { FinanceModule } from './modules/finance/finance.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    UserModule,
    BarberModule,
    ServiceModule,
    BookingModule,
    ClientModule,
    QueueModule,
    LoyaltyModule,
    NotificationModule,
    FinanceModule,
    AnalyticsModule,
  ],
})
export class AppModule {}