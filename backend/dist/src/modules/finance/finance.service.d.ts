import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Commission } from './entities/commission.entity';
import { Booking } from '../bookings/entities/booking.entity';
export declare class FinanceService {
    private paymentRepo;
    private commissionRepo;
    constructor(paymentRepo: Repository<Payment>, commissionRepo: Repository<Commission>);
    processPayment(booking: Booking, amount: number, stripeId: string): Promise<any>;
}
