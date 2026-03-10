import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../core/base/base.entity';
import { Booking } from '../../bookings/entities/booking.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
  FAILED = 'failed',
}

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({ name: 'booking_id' })
  bookingId: string;

  @OneToOne(() => Booking, (booking) => booking.payment)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'stripe_id', nullable: true })
  @Index('idx_payment_stripe_id')
  stripeId: string | null;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
}