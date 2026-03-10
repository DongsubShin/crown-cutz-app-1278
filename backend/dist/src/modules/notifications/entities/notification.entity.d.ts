import { BaseEntity } from '../../../core/base/base.entity';
import { Client } from '../../clients/entities/client.entity';
export declare enum NotificationType {
    REMINDER = "reminder",
    MARKETING = "marketing",
    TRANSACTIONAL = "transactional"
}
export declare enum NotificationStatus {
    PENDING = "pending",
    SENT = "sent",
    FAILED = "failed"
}
export declare class Notification extends BaseEntity {
    clientId: string;
    client: Client;
    type: NotificationType;
    content: string;
    scheduledAt: Date;
    sentAt: Date | null;
    status: NotificationStatus;
}
