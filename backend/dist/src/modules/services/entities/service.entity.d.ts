import { BaseEntity } from '../../../core/base/base.entity';
export declare class Service extends BaseEntity {
    name: string;
    description: string | null;
    durationMinutes: number;
    price: number;
    category: string;
    isActive: boolean;
}
