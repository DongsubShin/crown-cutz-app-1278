import { BaseEntity } from '../../../core/base/base.entity';
import { Booking } from '../../bookings/entities/booking.entity';
export declare enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    REFUNDED = "refunded",
    FAILED = "failed"
}
export declare class Payment extends BaseEntity {
    bookingId: string;
    booking: Booking;
    amount: number;
    stripeId: string | null;
    status: PaymentStatus;
}
