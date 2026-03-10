import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../core/base/base.entity';
import { Barber } from '../../barbers/entities/barber.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('commissions')
export class Commission extends BaseEntity {
  @Column({ name: 'barber_id' })
  barberId: string;

  @ManyToOne(() => Barber, (barber) => barber.commissions)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column({ name: 'booking_id' })
  bookingId: string;

  @OneToOne(() => Booking)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'rate', type: 'decimal', precision: 5, scale: 2 })
  rate: number;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt: Date | null;
}