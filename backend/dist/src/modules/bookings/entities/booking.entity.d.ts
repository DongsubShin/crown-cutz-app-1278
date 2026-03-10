import { BaseEntity } from '../../../core/base/base.entity';
import { Client } from '../../clients/entities/client.entity';
import { Barber } from '../../barbers/entities/barber.entity';
import { Service } from '../../services/entities/service.entity';
import { Payment } from '../../finance/entities/payment.entity';
export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    NO_SHOW = "no_show"
}
export declare class Booking extends BaseEntity {
    clientId: string;
    client: Client;
    barberId: string;
    barber: Barber;
    serviceId: string;
    service: Service;
    startTime: Date;
    endTime: Date;
    status: BookingStatus;
    payment: Payment;
}
