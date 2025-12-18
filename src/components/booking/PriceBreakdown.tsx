import { PriceBreakdownItem } from '@/types';
import { cn } from '@/lib/utils';

interface PriceBreakdownProps {
  breakdown: PriceBreakdownItem[];
  total: number;
  compact?: boolean;
}

export const PriceBreakdown = ({ breakdown, total, compact = false }: PriceBreakdownProps) => {
  if (breakdown.length === 0) {
    return (
      <div className={cn(
        "rounded-xl border-2 border-dashed border-muted p-4",
        compact && "p-3"
      )}>
        <p className="text-muted-foreground text-center">
          Select options to see price breakdown
        </p>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "rounded-xl border bg-card p-4 space-y-3",
      compact && "p-3 space-y-2"
    )}>
      <h4 className={cn("font-bold", compact ? "text-sm" : "text-lg")}>
        Price Breakdown
      </h4>
      
      <div className="space-y-2">
        {breakdown.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between",
              compact && "text-sm"
            )}
          >
            <span className={cn(
              "text-muted-foreground",
              item.type === 'base' && "font-medium text-foreground"
            )}>
              {item.label}
            </span>
            <span className={cn(
              "font-medium",
              item.type === 'rule' && "text-accent",
              item.type === 'equipment' && "text-primary",
              item.type === 'coach' && "text-primary"
            )}>
              {item.type === 'rule' ? '+' : ''}${item.amount}
            </span>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-3 mt-3">
        <div className="flex items-center justify-between">
          <span className={cn("font-bold", compact ? "text-base" : "text-lg")}>
            Total
          </span>
          <span className={cn(
            "font-bold text-primary",
            compact ? "text-xl" : "text-2xl"
          )}>
            ${total}
          </span>
        </div>
      </div>
    </div>
  );
};
