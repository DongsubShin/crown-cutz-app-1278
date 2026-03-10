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
exports.Notification = exports.NotificationStatus = exports.NotificationType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../core/base/base.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
var NotificationType;
(function (NotificationType) {
    NotificationType["REMINDER"] = "reminder";
    NotificationType["MARKETING"] = "marketing";
    NotificationType["TRANSACTIONAL"] = "transactional";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["PENDING"] = "pending";
    NotificationStatus["SENT"] = "sent";
    NotificationStatus["FAILED"] = "failed";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
let Notification = class Notification extends base_entity_1.BaseEntity {
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], Notification.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.notifications),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], Notification.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: NotificationType,
    }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'content', type: 'text' }),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_at', type: 'timestamp' }),
    (0, typeorm_1.Index)('idx_notification_scheduled'),
    __metadata("design:type", Date)
], Notification.prototype, "scheduledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sent_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.PENDING,
    }),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)('notifications')
], Notification);
//# sourceMappingURL=notification.entity.js.map