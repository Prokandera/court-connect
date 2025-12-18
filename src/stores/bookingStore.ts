import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Court, TimeSlot, Equipment, Coach, BookingEquipment, PriceBreakdownItem, Booking } from '@/types';
import { mockPricingRules } from '@/data/mockData';

interface BookingStore {
  // Current step (1-5)
  currentStep: number;
  
  // Selections
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  selectedCourt: Court | null;
  selectedEquipment: BookingEquipment[];
  selectedCoach: Coach | null;
  
  // User bookings
  userBookings: Booking[];
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setDate: (date: Date | null) => void;
  setTimeSlot: (slot: TimeSlot | null) => void;
  setCourt: (court: Court | null) => void;
  addEquipment: (equipment: Equipment, quantity: number) => void;
  removeEquipment: (equipmentId: string) => void;
  updateEquipmentQuantity: (equipmentId: string, quantity: number) => void;
  setCoach: (coach: Coach | null) => void;
  resetBooking: () => void;
  confirmBooking: () => void;
  
  // Computed
  calculatePrice: () => { total: number; breakdown: PriceBreakdownItem[] };
}

const initialState = {
  currentStep: 1,
  selectedDate: null,
  selectedTimeSlot: null,
  selectedCourt: null,
  selectedEquipment: [],
  selectedCoach: null,
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      userBookings: [],
  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 5) 
  })),
  
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 1) 
  })),
  
  setDate: (date) => set({ selectedDate: date, selectedTimeSlot: null }),
  
  setTimeSlot: (slot) => set({ selectedTimeSlot: slot }),
  
  setCourt: (court) => set({ selectedCourt: court }),
  
  addEquipment: (equipment, quantity) => set((state) => {
    const existing = state.selectedEquipment.find(
      (e) => e.equipment.id === equipment.id
    );
    
    if (existing) {
      return {
        selectedEquipment: state.selectedEquipment.map((e) =>
          e.equipment.id === equipment.id
            ? { ...e, quantity: e.quantity + quantity }
            : e
        ),
      };
    }
    
    return {
      selectedEquipment: [
        ...state.selectedEquipment,
        { equipment, quantity },
      ],
    };
  }),
  
  removeEquipment: (equipmentId) => set((state) => ({
    selectedEquipment: state.selectedEquipment.filter(
      (e) => e.equipment.id !== equipmentId
    ),
  })),
  
  updateEquipmentQuantity: (equipmentId, quantity) => set((state) => {
    if (quantity <= 0) {
      return {
        selectedEquipment: state.selectedEquipment.filter(
          (e) => e.equipment.id !== equipmentId
        ),
      };
    }
    
    return {
      selectedEquipment: state.selectedEquipment.map((e) =>
        e.equipment.id === equipmentId ? { ...e, quantity } : e
      ),
    };
  }),
  
  setCoach: (coach) => set({ selectedCoach: coach }),
  
  resetBooking: () => set(initialState),
  
  confirmBooking: () => {
    const state = get();
    if (!state.selectedCourt || !state.selectedDate || !state.selectedTimeSlot) return;
    
    const { total, breakdown } = state.calculatePrice();
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      date: state.selectedDate.toISOString(),
      timeSlot: state.selectedTimeSlot,
      court: state.selectedCourt,
      equipment: state.selectedEquipment,
      coach: state.selectedCoach || undefined,
      totalPrice: total,
      priceBreakdown: breakdown,
      status: 'confirmed',
      userId: 'current-user',
      createdAt: new Date().toISOString(),
    };
    
    set((s) => ({
      ...initialState,
      userBookings: [...s.userBookings, newBooking],
    }));
  },
  
  calculatePrice: () => {
    const state = get();
    const breakdown: PriceBreakdownItem[] = [];
    let total = 0;
    
    if (!state.selectedCourt) {
      return { total: 0, breakdown: [] };
    }
    
    // Base court price
    const basePrice = state.selectedCourt.basePrice;
    breakdown.push({
      label: `${state.selectedCourt.name} (1 hour)`,
      amount: basePrice,
      type: 'base',
    });
    total += basePrice;
    
    // Apply pricing rules
    const activeRules = mockPricingRules.filter((rule) => rule.isActive);
    
    activeRules.forEach((rule) => {
      let applies = false;
      
      switch (rule.type) {
        case 'peak_hour':
          if (state.selectedTimeSlot?.isPeakHour) {
            applies = true;
          }
          break;
        case 'weekend':
          if (state.selectedDate) {
            const dayOfWeek = state.selectedDate.getDay();
            applies = rule.conditions?.daysOfWeek?.includes(dayOfWeek) ?? false;
          }
          break;
        case 'indoor_premium':
          applies = state.selectedCourt.type === 'indoor';
          break;
      }
      
      if (applies && rule.multiplier) {
        const additionalAmount = Math.round(basePrice * (rule.multiplier - 1));
        breakdown.push({
          label: `${rule.name} (${Math.round((rule.multiplier - 1) * 100)}%)`,
          amount: additionalAmount,
          type: 'rule',
        });
        total += additionalAmount;
      }
    });
    
    // Equipment costs
    state.selectedEquipment.forEach((item) => {
      const equipmentCost = item.equipment.pricePerHour * item.quantity;
      breakdown.push({
        label: `${item.equipment.name} x${item.quantity}`,
        amount: equipmentCost,
        type: 'equipment',
      });
      total += equipmentCost;
    });
    
    // Coach cost
    if (state.selectedCoach) {
      breakdown.push({
        label: `Coach: ${state.selectedCoach.name}`,
        amount: state.selectedCoach.pricePerHour,
        type: 'coach',
      });
      total += state.selectedCoach.pricePerHour;
    }
    
    return { total, breakdown };
  },
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({ userBookings: state.userBookings }),
    }
  )
);
