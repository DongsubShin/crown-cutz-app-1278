import { BaseEntity } from '../../../core/base/base.entity';
import { User } from '../../users/entities/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { LoyaltyCard } from '../../loyalty/entities/loyalty-card.entity';
import { Notification } from '../../notifications/entities/notification.entity';
export declare class Client extends BaseEntity {
    userId: string | null;
    user: User | null;
    phone: string;
    email: string | null;
    visitCount: number;
    notes: string | null;
    bookings: Booking[];
    loyaltyCard: LoyaltyCard;
    notifications: Notification[];
}
