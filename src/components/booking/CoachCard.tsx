import { Star, Clock } from 'lucide-react';
import { Coach } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CoachCardProps {
  coach: Coach;
  isSelected: boolean;
  isAvailable: boolean;
  onSelect: () => void;
}

export const CoachCard = ({ coach, isSelected, isAvailable, onSelect }: CoachCardProps) => {
  return (
    <button
      onClick={onSelect}
      disabled={!isAvailable || !coach.isActive}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left transition-all duration-300",
        isSelected && "border-primary ring-2 ring-primary ring-offset-2 bg-primary/5",
        !isSelected && isAvailable && "border-border hover:border-primary hover:shadow-lg",
        (!isAvailable || !coach.isActive) && "opacity-50 cursor-not-allowed bg-muted"
      )}
    >
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
          {coach.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg">{coach.name}</h3>
              <Badge variant="secondary" className="mt-1">
                {coach.specialization}
              </Badge>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-primary">${coach.pricePerHour}</span>
              <span className="text-sm text-muted-foreground">/hr</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{coach.bio}</p>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-sport-yellow text-sport-yellow" />
              <span className="font-medium">{coach.rating}</span>
            </div>
            
            {!isAvailable && (
              <div className="flex items-center gap-1 text-destructive">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Not available for this slot</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
};
