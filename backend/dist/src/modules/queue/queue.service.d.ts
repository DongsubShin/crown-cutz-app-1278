import { Repository } from 'typeorm';
import { QueueEntry } from './entities/queue-entry.entity';
export declare class QueueService {
    private queueRepo;
    constructor(queueRepo: Repository<QueueEntry>);
    joinQueue(clientId: string, barberId?: string): Promise<QueueEntry>;
    getLiveQueue(): Promise<any>;
}
