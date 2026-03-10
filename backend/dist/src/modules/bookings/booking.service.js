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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./entities/booking.entity");
let BookingService = class BookingService {
    constructor(bookingRepo) {
        this.bookingRepo = bookingRepo;
    }
    async create(dto) {
        const conflict = await this.bookingRepo.findOne({
            where: {
                barberId: dto.barberId,
                status: booking_entity_1.BookingStatus.CONFIRMED,
                startTime: (0, typeorm_2.Between)(new Date(dto.startTime), new Date(dto.endTime)),
            },
        });
        if (conflict) {
            throw new common_1.BadRequestException('Barber is already booked at this time');
        }
        const booking = this.bookingRepo.create(dto);
        return this.bookingRepo.save(booking);
    }
    async findAll() {
        return this.bookingRepo.find({ relations: ['client', 'barber', 'service'] });
    }
    async findByBarber(barberId) {
        return this.bookingRepo.find({ where: { barberId }, relations: ['client', 'service'] });
    }
    async updateStatus(id, status) {
        await this.bookingRepo.update(id, { status });
        return this.bookingRepo.findOne({ where: { id } });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], BookingService);
//# sourceMappingURL=booking.service.js.map