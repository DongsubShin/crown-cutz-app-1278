"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barber = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../core/base/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const service_entity_1 = require("../../services/entities/service.entity");
const booking_entity_1 = require("../../bookings/entities/booking.entity");
const commission_entity_1 = require("../../finance/entities/commission.entity");
let Barber = class Barber extends base_entity_1.BaseEntity {
};
exports.Barber = Barber;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Barber.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Barber.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bio', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Barber.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_hours', type: 'jsonb' }),
    __metadata("design:type", Object)
], Barber.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commission_rate', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Barber.prototype, "commissionRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Barber.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.Service),
    (0, typeorm_1.JoinTable)({
        name: 'barber_services',
        joinColumn: { name: 'barber_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Barber.prototype, "specialties", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.barber),
    __metadata("design:type", Array)
], Barber.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commission_entity_1.Commission, (commission) => commission.barber),
    __metadata("design:type", Array)
], Barber.prototype, "commissions", void 0);
exports.Barber = Barber = __decorate([
    (0, typeorm_1.Entity)('barbers')
], Barber);
//# sourceMappingURL=barber.entity.js.map