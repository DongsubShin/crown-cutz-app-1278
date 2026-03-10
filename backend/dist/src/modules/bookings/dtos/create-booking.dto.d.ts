import { BookingStatus } from '../entities/booking.entity';
export declare class CreateBookingDto {
    clientId: string;
    barberId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    status: BookingStatus;
}
