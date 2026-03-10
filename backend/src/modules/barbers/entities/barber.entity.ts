import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../core/base/base.entity';
import { User } from '../../users/entities/user.entity';
import { Service } from '../../services/entities/service.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Commission } from '../../finance/entities/commission.entity';

@Entity('barbers')
export class Barber extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio: string | null;

  @Column({ name: 'working_hours', type: 'jsonb' })
  workingHours: any; // Format: { monday: { start: '09:00', end: '18:00' }, ... }

  @Column({ name: 'commission_rate', type: 'decimal', precision: 5, scale: 2, default: 0 })
  commissionRate: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToMany(() => Service)
  @JoinTable({
    name: 'barber_services',
    joinColumn: { name: 'barber_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
  })
  specialties: Service[];

  @OneToMany(() => Booking, (booking) => booking.barber)
  bookings: Booking[];

  @OneToMany(() => Commission, (commission) => commission.barber)
  commissions: Commission[];
}