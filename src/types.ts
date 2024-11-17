export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'staff';
}

export interface ParkingSpot {
  id: string;
  building: 'A' | 'Eble' | 'E';
  number: string;
  isAvailable: boolean;
}

export interface Reservation {
  id: string;
  userId: string;
  spotId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  cost: number;
}