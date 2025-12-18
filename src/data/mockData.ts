import { Court, Equipment, Coach, TimeSlot, PricingRule, Booking } from '@/types';

export const mockCourts: Court[] = [
  {
    id: 'court-1',
    name: 'Court A',
    type: 'indoor',
    description: 'Premium indoor court with air conditioning and professional lighting',
    basePrice: 40,
    isActive: true,
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'court-2',
    name: 'Court B',
    type: 'indoor',
    description: 'Indoor court with excellent ventilation and wooden flooring',
    basePrice: 35,
    isActive: true,
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'court-3',
    name: 'Court C',
    type: 'outdoor',
    description: 'Outdoor court with natural lighting and covered seating',
    basePrice: 25,
    isActive: true,
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'court-4',
    name: 'Court D',
    type: 'outdoor',
    description: 'Outdoor court with scenic views and evening lighting',
    basePrice: 25,
    isActive: true,
    imageUrl: '/placeholder.svg',
  },
];

export const mockEquipment: Equipment[] = [
  {
    id: 'equip-1',
    name: 'Pro Racket',
    type: 'racket',
    description: 'Professional grade badminton racket',
    pricePerHour: 8,
    totalQuantity: 10,
    availableQuantity: 7,
  },
  {
    id: 'equip-2',
    name: 'Standard Racket',
    type: 'racket',
    description: 'Standard badminton racket for beginners',
    pricePerHour: 5,
    totalQuantity: 15,
    availableQuantity: 12,
  },
  {
    id: 'equip-3',
    name: 'Court Shoes (Men)',
    type: 'shoes',
    description: 'Men\'s badminton court shoes',
    pricePerHour: 6,
    totalQuantity: 8,
    availableQuantity: 5,
  },
  {
    id: 'equip-4',
    name: 'Court Shoes (Women)',
    type: 'shoes',
    description: 'Women\'s badminton court shoes',
    pricePerHour: 6,
    totalQuantity: 8,
    availableQuantity: 6,
  },
];

export const mockCoaches: Coach[] = [
  {
    id: 'coach-1',
    name: 'David Chen',
    bio: 'Former national team player with 15 years of coaching experience',
    specialization: 'Singles & Footwork',
    pricePerHour: 50,
    rating: 4.9,
    imageUrl: '/placeholder.svg',
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 5, startTime: '09:00', endTime: '17:00' },
    ],
    isActive: true,
  },
  {
    id: 'coach-2',
    name: 'Sarah Johnson',
    bio: 'Certified BWF coach specializing in doubles strategy',
    specialization: 'Doubles & Strategy',
    pricePerHour: 45,
    rating: 4.8,
    imageUrl: '/placeholder.svg',
    availability: [
      { dayOfWeek: 1, startTime: '14:00', endTime: '21:00' },
      { dayOfWeek: 3, startTime: '14:00', endTime: '21:00' },
      { dayOfWeek: 5, startTime: '14:00', endTime: '21:00' },
      { dayOfWeek: 6, startTime: '10:00', endTime: '18:00' },
    ],
    isActive: true,
  },
  {
    id: 'coach-3',
    name: 'Michael Park',
    bio: 'Youth development specialist with focus on technique building',
    specialization: 'Beginners & Youth',
    pricePerHour: 35,
    rating: 4.7,
    imageUrl: '/placeholder.svg',
    availability: [
      { dayOfWeek: 2, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 4, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 6, startTime: '09:00', endTime: '15:00' },
      { dayOfWeek: 0, startTime: '09:00', endTime: '15:00' },
    ],
    isActive: true,
  },
];

export const mockPricingRules: PricingRule[] = [
  {
    id: 'rule-1',
    name: 'Peak Hour Premium',
    type: 'peak_hour',
    description: 'Higher rates during evening peak hours (6-9 PM)',
    multiplier: 1.3,
    isActive: true,
    conditions: {
      startTime: '18:00',
      endTime: '21:00',
    },
  },
  {
    id: 'rule-2',
    name: 'Weekend Premium',
    type: 'weekend',
    description: 'Higher rates on weekends',
    multiplier: 1.2,
    isActive: true,
    conditions: {
      daysOfWeek: [0, 6],
    },
  },
  {
    id: 'rule-3',
    name: 'Indoor Court Premium',
    type: 'indoor_premium',
    description: 'Premium for climate-controlled indoor courts',
    multiplier: 1.15,
    isActive: true,
    conditions: {
      courtType: 'indoor',
    },
  },
];

// Generate time slots for a day
export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 6; // 6 AM
  const endHour = 22; // 10 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    const isPeakHour = hour >= 18 && hour < 21;
    
    // Randomly mark some slots as unavailable for demo
    const isAvailable = Math.random() > 0.2;
    
    slots.push({
      id: `slot-${hour}`,
      startTime,
      endTime,
      isAvailable,
      isPeakHour,
    });
  }
  
  return slots;
};

// Generate mock bookings
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    date: new Date().toISOString().split('T')[0],
    timeSlot: {
      id: 'slot-10',
      startTime: '10:00',
      endTime: '11:00',
      isAvailable: false,
      isPeakHour: false,
    },
    court: mockCourts[0],
    equipment: [{ equipment: mockEquipment[0], quantity: 2 }],
    coach: mockCoaches[0],
    userId: 'user-1',
    status: 'confirmed',
    totalPrice: 114,
    priceBreakdown: [
      { label: 'Court A (1 hour)', amount: 40, type: 'base' },
      { label: 'Indoor Premium (15%)', amount: 6, type: 'rule' },
      { label: 'Pro Racket x2', amount: 16, type: 'equipment' },
      { label: 'Coach: David Chen', amount: 50, type: 'coach' },
    ],
    createdAt: new Date().toISOString(),
  },
];

export const mockUser = {
  id: 'user-1',
  email: 'player@example.com',
  name: 'John Player',
  phone: '+1234567890',
  isAdmin: false,
};

export const mockAdmin = {
  id: 'admin-1',
  email: 'admin@example.com',
  name: 'Admin User',
  isAdmin: true,
};
