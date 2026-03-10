import { BaseEntity } from '../../../core/base/base.entity';
import { Client } from '../../clients/entities/client.entity';
import { Barber } from '../../barbers/entities/barber.entity';
export declare enum QueueStatus {
    WAITING = "waiting",
    SERVING = "serving",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class QueueEntry extends BaseEntity {
    clientId: string;
    client: Client;
    barberId: string | null;
    barber: Barber | null;
    position: number;
    status: QueueStatus;
    estimatedWaitMinutes: number;
}
