export type Role = 'admin' | 'barber' | 'client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
}

export interface Booking {
  id: string;
  clientId: string;
  barberId: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  client?: Client;
  service?: Service;
}

export interface QueueEntry {
  id: string;
  clientName: string;
  phoneNumber: string;
  serviceId: string;
  position: number;
  estimatedWaitMinutes: number;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  joinedAt: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  lastVisit?: string;
  totalSpend: number;
}

export interface CommissionRecord {
  id: string;
  barberId: string;
  bookingId: string;
  amount: number;
  percentage: number;
  date: string;
}