import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntry, QueueStatus } from './entities/queue-entry.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueEntry)
    private queueRepo: Repository<QueueEntry>,
  ) {}

  async joinQueue(clientId: string, barberId?: string): Promise<QueueEntry> {
    const lastEntry = await this.queueRepo.findOne({
      where: { status: QueueStatus.WAITING },
      order: { position: 'DESC' },
    });

    const position = lastEntry ? lastEntry.position + 1 : 1;
    const waitTime = position * 20; // Estimate 20 mins per person

    const entry = this.queueRepo.create({
      clientId,
      barberId,
      position,
      estimatedWaitMinutes: waitTime,
      status: QueueStatus.WAITING,
    });

    return this.queueRepo.save(entry);
  }

  async getLiveQueue() {
    return this.queueRepo.find({
      where: { status: QueueStatus.WAITING },
      order: { position: 'ASC' },
      relations: ['client', 'barber'],
    });
  }
}