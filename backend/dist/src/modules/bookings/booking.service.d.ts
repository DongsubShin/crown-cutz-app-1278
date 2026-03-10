import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
export declare class BookingService {
    private bookingRepo;
    constructor(bookingRepo: Repository<Booking>);
    create(dto: CreateBookingDto): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    findByBarber(barberId: string): Promise<Booking[]>;
    updateStatus(id: string, status: BookingStatus): Promise<Booking>;
}
