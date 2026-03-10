import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    // Check for double booking
    const conflict = await this.bookingRepo.findOne({
      where: {
        barberId: dto.barberId,
        status: BookingStatus.CONFIRMED,
        startTime: Between(new Date(dto.startTime), new Date(dto.endTime)),
      },
    });

    if (conflict) {
      throw new BadRequestException('Barber is already booked at this time');
    }

    const booking = this.bookingRepo.create(dto);
    return this.bookingRepo.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepo.find({ relations: ['client', 'barber', 'service'] });
  }

  async findByBarber(barberId: string): Promise<Booking[]> {
    return this.bookingRepo.find({ where: { barberId }, relations: ['client', 'service'] });
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    await this.bookingRepo.update(id, { status });
    return this.bookingRepo.findOne({ where: { id } });
  }
}