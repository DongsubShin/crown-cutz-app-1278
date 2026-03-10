import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingStatus } from './entities/booking.entity';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(dto: CreateBookingDto): Promise<import("./entities/booking.entity").Booking>;
    findAll(): Promise<import("./entities/booking.entity").Booking[]>;
    updateStatus(id: string, status: BookingStatus): Promise<import("./entities/booking.entity").Booking>;
}
