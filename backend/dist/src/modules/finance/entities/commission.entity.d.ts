import { BaseEntity } from '../../../core/base/base.entity';
import { Barber } from '../../barbers/entities/barber.entity';
import { Booking } from '../../bookings/entities/booking.entity';
export declare class Commission extends BaseEntity {
    barberId: string;
    barber: Barber;
    bookingId: string;
    booking: Booking;
    amount: number;
    rate: number;
    paidAt: Date | null;
}
