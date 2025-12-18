import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/stores/bookingStore';
import { StepIndicator } from '@/components/booking/StepIndicator';
import { DatePicker } from '@/components/booking/DatePicker';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { CourtCard } from '@/components/booking/CourtCard';
import { EquipmentCard } from '@/components/booking/EquipmentCard';
import { CoachCard } from '@/components/booking/CoachCard';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';
import { mockCourts, mockEquipment, mockCoaches, generateTimeSlots } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const steps = [
  { number: 1, label: 'Date & Time' },
  { number: 2, label: 'Court' },
  { number: 3, label: 'Equipment' },
  { number: 4, label: 'Coach' },
  { number: 5, label: 'Confirm' },
];

const BookingPage = () => {
  const { toast } = useToast();
  const {
    currentStep, setStep, nextStep, prevStep,
    selectedDate, setDate,
    selectedTimeSlot, setTimeSlot,
    selectedCourt, setCourt,
    selectedEquipment, addEquipment, updateEquipmentQuantity,
    selectedCoach, setCoach,
    calculatePrice, confirmBooking,
  } = useBookingStore();

  const handleEquipmentQuantityChange = (equipment: typeof mockEquipment[0], newQuantity: number) => {
    const existing = selectedEquipment.find(e => e.equipment.id === equipment.id);
    if (!existing && newQuantity > 0) {
      addEquipment(equipment, newQuantity);
    } else {
      updateEquipmentQuantity(equipment.id, newQuantity);
    }
  };

  const { total, breakdown } = calculatePrice();
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedDate && selectedTimeSlot;
      case 2: return selectedCourt;
      case 3: return true;
      case 4: return true;
      default: return true;
    }
  };

  const handleConfirm = () => {
    confirmBooking();
    toast({ title: "Booking Confirmed!", description: "Your booking has been successfully created." });
  };

  const isCoachAvailable = (coach: typeof mockCoaches[0]) => {
    if (!selectedDate || !selectedTimeSlot) return false;
    const dayOfWeek = selectedDate.getDay();
    return coach.availability.some(a => 
      a.dayOfWeek === dayOfWeek && 
      selectedTimeSlot.startTime >= a.startTime && 
      selectedTimeSlot.endTime <= a.endTime
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold text-center mb-8">Book Your Court</h1>
      
      <StepIndicator steps={steps} currentStep={currentStep} onStepClick={(s) => s < currentStep && setStep(s)} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Date & Time */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-slide-up">
              <DatePicker selectedDate={selectedDate} onDateSelect={setDate} />
              {selectedDate && <TimeSlotPicker slots={timeSlots} selectedSlot={selectedTimeSlot} onSlotSelect={setTimeSlot} />}
            </div>
          )}

          {/* Step 2: Court */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-slide-up">
              <h3 className="text-lg font-semibold">Select Court</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {mockCourts.filter(c => c.isActive).map(court => (
                  <CourtCard key={court.id} court={court} isSelected={selectedCourt?.id === court.id} onSelect={() => setCourt(court)} />
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Equipment */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-slide-up">
              <h3 className="text-lg font-semibold">Add Equipment (Optional)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {mockEquipment.map(eq => (
                  <EquipmentCard 
                    key={eq.id} 
                    equipment={eq} 
                    selectedQuantity={selectedEquipment.find(e => e.equipment.id === eq.id)?.quantity || 0}
                    onQuantityChange={(qty) => handleEquipmentQuantityChange(eq, qty)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Coach */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-slide-up">
              <h3 className="text-lg font-semibold">Book a Coach (Optional)</h3>
              <Button variant="outline" onClick={() => setCoach(null)} className="mb-4">Skip Coach</Button>
              <div className="space-y-4">
                {mockCoaches.map(coach => (
                  <CoachCard key={coach.id} coach={coach} isSelected={selectedCoach?.id === coach.id} isAvailable={isCoachAvailable(coach)} onSelect={() => setCoach(coach)} />
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Confirm */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-lg font-semibold">Booking Summary</h3>
              <div className="p-6 rounded-xl border bg-card space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Date:</span> <strong>{selectedDate && format(selectedDate, 'PPP')}</strong></div>
                  <div><span className="text-muted-foreground">Time:</span> <strong>{selectedTimeSlot?.startTime} - {selectedTimeSlot?.endTime}</strong></div>
                  <div><span className="text-muted-foreground">Court:</span> <strong>{selectedCourt?.name}</strong></div>
                  <div><span className="text-muted-foreground">Coach:</span> <strong>{selectedCoach?.name || 'None'}</strong></div>
                </div>
                {selectedEquipment.length > 0 && (
                  <div><span className="text-muted-foreground">Equipment:</span> {selectedEquipment.map(e => `${e.equipment.name} x${e.quantity}`).join(', ')}</div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>Back</Button>
            {currentStep < 5 ? (
              <Button onClick={nextStep} disabled={!canProceed()}>Continue</Button>
            ) : (
              <Button onClick={handleConfirm} className="bg-accent hover:bg-accent/90">Confirm Booking - ${total}</Button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 h-fit">
          <PriceBreakdown breakdown={breakdown} total={total} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
