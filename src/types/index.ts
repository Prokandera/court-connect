// Court Types
export type CourtType = 'indoor' | 'outdoor';

export interface Court {
  id: string;
  name: string;
  type: CourtType;
  description: string;
  basePrice: number;
  isActive: boolean;
  imageUrl?: string;
}

// Equipment Types
export type EquipmentType = 'racket' | 'shoes';

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  description: string;
  pricePerHour: number;
  totalQuantity: number;
  availableQuantity: number;
  imageUrl?: string;
}

// Coach Types
export interface CoachAvailability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string;
}

export interface Coach {
  id: string;
  name: string;
  bio: string;
  specialization: string;
  pricePerHour: number;
  rating: number;
  imageUrl?: string;
  availability: CoachAvailability[];
  isActive: boolean;
}

// Time Slot Types
export interface TimeSlot {
  id: string;
  startTime: string; // HH:mm format
  endTime: string;
  isAvailable: boolean;
  isPeakHour: boolean;
}

// Pricing Rule Types
export type PricingRuleType = 'peak_hour' | 'weekend' | 'indoor_premium' | 'equipment' | 'coach';

export interface PricingRule {
  id: string;
  name: string;
  type: PricingRuleType;
  description: string;
  multiplier?: number; // For percentage-based rules (e.g., 1.2 for 20% increase)
  flatRate?: number; // For flat fee additions
  isActive: boolean;
  conditions?: {
    startTime?: string;
    endTime?: string;
    daysOfWeek?: number[];
    courtType?: CourtType;
  };
}

// Booking Types
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface BookingEquipment {
  equipment: Equipment;
  quantity: number;
}

export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD format
  timeSlot: TimeSlot;
  court: Court;
  equipment: BookingEquipment[];
  coach?: Coach;
  userId: string;
  status: BookingStatus;
  totalPrice: number;
  priceBreakdown: PriceBreakdownItem[];
  createdAt: string;
}

export interface PriceBreakdownItem {
  label: string;
  amount: number;
  type: 'base' | 'rule' | 'equipment' | 'coach';
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isAdmin: boolean;
}

// Booking Wizard State
export interface BookingWizardState {
  currentStep: number;
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  selectedCourt: Court | null;
  selectedEquipment: BookingEquipment[];
  selectedCoach: Coach | null;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface AvailabilityResponse {
  courtId: string;
  date: string;
  slots: TimeSlot[];
}
