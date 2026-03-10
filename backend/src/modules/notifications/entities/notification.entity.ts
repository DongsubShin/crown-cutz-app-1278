import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../core/base/base.entity';
import { Client } from '../../clients/entities/client.entity';

export enum NotificationType {
  REMINDER = 'reminder',
  MARKETING = 'marketing',
  TRANSACTIONAL = 'transactional',
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

@Entity('notifications')
export class Notification extends BaseEntity {
  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Client, (client) => client.notifications)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'scheduled_at', type: 'timestamp' })
  @Index('idx_notification_scheduled')
  scheduledAt: Date;

  @Column({ name: 'sent_at', type: 'timestamp', nullable: true })
  sentAt: Date | null;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;
}