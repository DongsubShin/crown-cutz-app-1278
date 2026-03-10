import { Entity, Column, ManyToOne, JoinColumn, OneToOne, Index } from 'typeorm';
import { BaseEntity } from '../../../core/base/base.entity';
import { Client } from '../../clients/entities/client.entity';
import { Barber } from '../../barbers/entities/barber.entity';
import { Service } from '../../services/entities/service.entity';
import { Payment } from '../../finance/entities/payment.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

@Entity('bookings')
export class Booking extends BaseEntity {
  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Client, (client) => client.bookings)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'barber_id' })
  barberId: string;

  @ManyToOne(() => Barber, (barber) => barber.bookings)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column({ name: 'service_id' })
  serviceId: string;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ name: 'start_time', type: 'timestamp' })
  @Index('idx_booking_start_time')
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp' })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @OneToOne(() => Payment, (payment) => payment.booking)
  payment: Payment;
}