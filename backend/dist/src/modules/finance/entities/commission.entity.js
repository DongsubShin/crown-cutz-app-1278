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
exports.Commission = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../core/base/base.entity");
const barber_entity_1 = require("../../barbers/entities/barber.entity");
const booking_entity_1 = require("../../bookings/entities/booking.entity");
let Commission = class Commission extends base_entity_1.BaseEntity {
};
exports.Commission = Commission;
__decorate([
    (0, typeorm_1.Column)({ name: 'barber_id' }),
    __metadata("design:type", String)
], Commission.prototype, "barberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barber_entity_1.Barber, (barber) => barber.commissions),
    (0, typeorm_1.JoinColumn)({ name: 'barber_id' }),
    __metadata("design:type", barber_entity_1.Barber)
], Commission.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'booking_id' }),
    __metadata("design:type", String)
], Commission.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => booking_entity_1.Booking),
    (0, typeorm_1.JoinColumn)({ name: 'booking_id' }),
    __metadata("design:type", booking_entity_1.Booking)
], Commission.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Commission.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rate', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Commission.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Commission.prototype, "paidAt", void 0);
exports.Commission = Commission = __decorate([
    (0, typeorm_1.Entity)('commissions')
], Commission);
//# sourceMappingURL=commission.entity.js.map