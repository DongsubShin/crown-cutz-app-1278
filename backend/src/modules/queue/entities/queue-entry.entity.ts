import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../core/base/base.entity';
import { Client } from '../../clients/entities/client.entity';
import { Barber } from '../../barbers/entities/barber.entity';

export enum QueueStatus {
  WAITING = 'waiting',
  SERVING = 'serving',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('queue_entries')
export class QueueEntry extends BaseEntity {
  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'barber_id', nullable: true })
  barberId: string | null;

  @ManyToOne(() => Barber, { nullable: true })
  @JoinColumn({ name: 'barber_id' })
  barber: Barber | null;

  @Column({ name: 'position', type: 'int' })
  position: number;

  @Column({
    type: 'enum',
    enum: QueueStatus,
    default: QueueStatus.WAITING,
  })
  status: QueueStatus;

  @Column({ name: 'estimated_wait_minutes', type: 'int' })
  estimatedWaitMinutes: number;
}