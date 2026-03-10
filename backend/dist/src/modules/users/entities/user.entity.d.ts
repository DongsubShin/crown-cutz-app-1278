import { BaseEntity } from '../../../core/base/base.entity';
export declare enum UserRole {
    ADMIN = "admin",
    BARBER = "barber",
    CLIENT = "client"
}
export declare class User extends BaseEntity {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isActive: boolean;
}
