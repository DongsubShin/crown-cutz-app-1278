import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { Commission } from './entities/commission.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Commission) private commissionRepo: Repository<Commission>,
  ) {}

  async processPayment(booking: Booking, amount: number, stripeId: string) {
    const payment = this.paymentRepo.create({
      bookingId: booking.id,
      amount,
      stripeId,
      status: PaymentStatus.COMPLETED,
    });

    await this.paymentRepo.save(payment);

    // Calculate Commission
    const commissionAmount = (amount * booking.barber.commissionRate) / 100;
    const commission = this.commissionRepo.create({
      barberId: booking.barberId,
      bookingId: booking.id,
      amount: commissionAmount,
      rate: booking.barber.commissionRate,
    });

    return this.commissionRepo.save(commission);
  }
}