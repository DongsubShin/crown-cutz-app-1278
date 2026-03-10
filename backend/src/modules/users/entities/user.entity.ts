import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../../core/base/base.entity';

export enum UserRole {
  ADMIN = 'admin',
  BARBER = 'barber',
  CLIENT = 'client',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'email', unique: true })
  @Index('idx_user_email')
  email: string;

  @Column({ name: 'password', select: false })
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}