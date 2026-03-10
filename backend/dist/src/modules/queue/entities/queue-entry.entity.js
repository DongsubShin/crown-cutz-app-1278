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
exports.QueueEntry = exports.QueueStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../core/base/base.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
const barber_entity_1 = require("../../barbers/entities/barber.entity");
var QueueStatus;
(function (QueueStatus) {
    QueueStatus["WAITING"] = "waiting";
    QueueStatus["SERVING"] = "serving";
    QueueStatus["COMPLETED"] = "completed";
    QueueStatus["CANCELLED"] = "cancelled";
})(QueueStatus || (exports.QueueStatus = QueueStatus = {}));
let QueueEntry = class QueueEntry extends base_entity_1.BaseEntity {
};
exports.QueueEntry = QueueEntry;
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], QueueEntry.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], QueueEntry.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'barber_id', nullable: true }),
    __metadata("design:type", String)
], QueueEntry.prototype, "barberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barber_entity_1.Barber, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'barber_id' }),
    __metadata("design:type", barber_entity_1.Barber)
], QueueEntry.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'position', type: 'int' }),
    __metadata("design:type", Number)
], QueueEntry.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: QueueStatus,
        default: QueueStatus.WAITING,
    }),
    __metadata("design:type", String)
], QueueEntry.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estimated_wait_minutes', type: 'int' }),
    __metadata("design:type", Number)
], QueueEntry.prototype, "estimatedWaitMinutes", void 0);
exports.QueueEntry = QueueEntry = __decorate([
    (0, typeorm_1.Entity)('queue_entries')
], QueueEntry);
//# sourceMappingURL=queue-entry.entity.js.map