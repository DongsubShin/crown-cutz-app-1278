import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../core/base/base.entity';
import { Client } from '../../clients/entities/client.entity';

export enum LoyaltyTier {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
}

@Entity('loyalty_cards')
export class LoyaltyCard extends BaseEntity {
  @Column({ name: 'client_id' })
  clientId: string;

  @OneToOne(() => Client, (client) => client.loyaltyCard)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'points', type: 'int', default: 0 })
  points: number;

  @Column({
    type: 'enum',
    enum: LoyaltyTier,
    default: LoyaltyTier.BRONZE,
  })
  tier: LoyaltyTier;

  @Column({ name: 'total_spent', type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalSpent: number;
}