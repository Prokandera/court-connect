import { Building2, Sun, Users } from 'lucide-react';
import { Court } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CourtCardProps {
  court: Court;
  isSelected: boolean;
  onSelect: () => void;
}

export const CourtCard = ({ court, isSelected, onSelect }: CourtCardProps) => {
  const isIndoor = court.type === 'indoor';
  
  return (
    <button
      onClick={onSelect}
      disabled={!court.isActive}
      className={cn(
        "relative w-full p-4 rounded-xl border-2 text-left transition-all duration-300",
        isIndoor ? "court-indoor" : "court-outdoor",
        isSelected && "border-primary ring-2 ring-primary ring-offset-2 bg-primary/5",
        !isSelected && court.isActive && "border-border hover:border-primary hover:shadow-lg",
        !court.isActive && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {isIndoor ? (
            <Building2 className="w-5 h-5 text-court-indoor" />
          ) : (
            <Sun className="w-5 h-5 text-court-outdoor" />
          )}
          <h3 className="font-bold text-lg">{court.name}</h3>
        </div>
        <Badge variant={isIndoor ? "default" : "secondary"}>
          {isIndoor ? 'Indoor' : 'Outdoor'}
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{court.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">2-4 players</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-primary">${court.basePrice}</span>
          <span className="text-sm text-muted-foreground">/hour</span>
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
