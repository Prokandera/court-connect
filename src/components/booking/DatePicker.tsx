import { format, addDays, isSameDay, isToday, isBefore, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const DatePicker = ({ selectedDate, onDateSelect }: DatePickerProps) => {
  const [startDate, setStartDate] = useState(new Date());
  
  const dates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  
  const handlePrevWeek = () => {
    const newStart = addDays(startDate, -7);
    if (!isBefore(newStart, startOfDay(new Date()))) {
      setStartDate(newStart);
    }
  };
  
  const handleNextWeek = () => {
    setStartDate(addDays(startDate, 7));
  };
  
  const canGoPrev = !isBefore(addDays(startDate, -7), startOfDay(new Date()));
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Date</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevWeek}
            disabled={!canGoPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => {
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isPast = isBefore(date, startOfDay(new Date()));
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => !isPast && onDateSelect(date)}
              disabled={isPast}
              className={cn(
                "flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200",
                isSelected && "border-primary bg-primary text-primary-foreground",
                !isSelected && !isPast && "border-border hover:border-primary hover:bg-primary/5",
                isPast && "opacity-50 cursor-not-allowed bg-muted",
                isToday(date) && !isSelected && "border-accent"
              )}
            >
              <span className="text-xs font-medium uppercase">
                {format(date, 'EEE')}
              </span>
              <span className="text-xl font-bold">{format(date, 'd')}</span>
              <span className="text-xs">{format(date, 'MMM')}</span>
              {isToday(date) && (
                <span className={cn(
                  "text-[10px] font-medium mt-1",
                  isSelected ? "text-primary-foreground" : "text-accent"
                )}>
                  Today
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
