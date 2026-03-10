import { BaseEntity } from '../../../core/base/base.entity';
import { User } from '../../users/entities/user.entity';
import { Service } from '../../services/entities/service.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Commission } from '../../finance/entities/commission.entity';
export declare class Barber extends BaseEntity {
    userId: string;
    user: User;
    bio: string | null;
    workingHours: any;
    commissionRate: number;
    isActive: boolean;
    specialties: Service[];
    bookings: Booking[];
    commissions: Commission[];
}
