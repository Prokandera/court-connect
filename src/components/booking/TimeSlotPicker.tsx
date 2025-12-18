import { Clock } from 'lucide-react';
import { TimeSlot } from '@/types';
import { cn } from '@/lib/utils';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSlotSelect: (slot: TimeSlot) => void;
}

export const TimeSlotPicker = ({ slots, selectedSlot, onSlotSelect }: TimeSlotPickerProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Time Slot</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span>Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span>Peak Hours</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          
          return (
            <button
              key={slot.id}
              onClick={() => slot.isAvailable && onSlotSelect(slot)}
              disabled={!slot.isAvailable}
              className={cn(
                "relative p-3 rounded-lg border-2 transition-all duration-200 text-center",
                slot.isAvailable && !isSelected && "border-border hover:border-primary hover:bg-primary/5",
                slot.isAvailable && slot.isPeakHour && !isSelected && "border-accent/50 bg-accent/5",
                isSelected && "border-primary bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                !slot.isAvailable && "bg-muted text-muted-foreground cursor-not-allowed opacity-60 border-muted"
              )}
            >
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="text-sm font-medium">{slot.startTime}</span>
              </div>
              {slot.isPeakHour && slot.isAvailable && (
                <span className={cn(
                  "absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full",
                  isSelected ? "bg-primary-foreground text-primary" : "bg-accent text-accent-foreground"
                )}>
                  Peak
                </span>
              )}
              {!slot.isAvailable && (
                <span className="text-[10px] block mt-1">Booked</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
