import { BaseEntity } from '../../../core/base/base.entity';
import { Client } from '../../clients/entities/client.entity';
export declare enum LoyaltyTier {
    BRONZE = "bronze",
    SILVER = "silver",
    GOLD = "gold",
    PLATINUM = "platinum"
}
export declare class LoyaltyCard extends BaseEntity {
    clientId: string;
    client: Client;
    points: number;
    tier: LoyaltyTier;
    totalSpent: number;
}
