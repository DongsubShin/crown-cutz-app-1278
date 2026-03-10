import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../core/base/base.entity';

@Entity('services')
export class Service extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'duration_minutes', type: 'int' })
  durationMinutes: number;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'category' })
  category: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}