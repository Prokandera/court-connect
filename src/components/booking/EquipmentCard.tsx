import { Minus, Plus } from 'lucide-react';
import { Equipment } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface EquipmentCardProps {
  equipment: Equipment;
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const EquipmentCard = ({ equipment, selectedQuantity, onQuantityChange }: EquipmentCardProps) => {
  const isSelected = selectedQuantity > 0;
  const maxQuantity = equipment.availableQuantity;
  
  return (
    <div
      className={cn(
        "p-4 rounded-xl border-2 transition-all duration-300",
        isSelected && "border-primary bg-primary/5",
        !isSelected && "border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold">{equipment.name}</h3>
          <Badge variant="outline" className="mt-1">
            {equipment.type === 'racket' ? '🏸 Racket' : '👟 Shoes'}
          </Badge>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-primary">${equipment.pricePerHour}</span>
          <span className="text-sm text-muted-foreground">/hr</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{equipment.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {equipment.availableQuantity} available
        </span>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onQuantityChange(Math.max(0, selectedQuantity - 1))}
            disabled={selectedQuantity === 0}
          >
            <Minus className="w-4 h-4" />
          </Button>
          
          <span className="w-8 text-center font-bold">{selectedQuantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onQuantityChange(selectedQuantity + 1)}
            disabled={selectedQuantity >= maxQuantity}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
