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
exports.Booking = exports.BookingStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../core/base/base.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
const barber_entity_1 = require("../../barbers/entities/barber.entity");
const service_entity_1 = require("../../services/entities/service.entity");
const payment_entity_1 = require("../../finance/entities/payment.entity");
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["COMPLETED"] = "completed";
    BookingStatus["CANCELLED"] = "cancelled";
    BookingStatus["NO_SHOW"] = "no_show";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
let Booking = class Booking extends base_entity_1.BaseEntity {
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], Booking.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], Booking.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'barber_id' }),
    __metadata("design:type", String)
], Booking.prototype, "barberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barber_entity_1.Barber, (barber) => barber.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'barber_id' }),
    __metadata("design:type", barber_entity_1.Barber)
], Booking.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_id' }),
    __metadata("design:type", String)
], Booking.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service),
    (0, typeorm_1.JoinColumn)({ name: 'service_id' }),
    __metadata("design:type", service_entity_1.Service)
], Booking.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'timestamp' }),
    (0, typeorm_1.Index)('idx_booking_start_time'),
    __metadata("design:type", Date)
], Booking.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'timestamp' }),
    __metadata("design:type", Date)
], Booking.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.PENDING,
    }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_entity_1.Payment, (payment) => payment.booking),
    __metadata("design:type", payment_entity_1.Payment)
], Booking.prototype, "payment", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)('bookings')
], Booking);
//# sourceMappingURL=booking.entity.js.map