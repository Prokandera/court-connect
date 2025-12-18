import { mockEquipment } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AdminEquipment = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Equipment Management</h1>
        <Button><Plus className="w-4 h-4 mr-2" />Add Equipment</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {mockEquipment.map(eq => (
          <div key={eq.id} className="p-6 rounded-xl border bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold">{eq.name}</h3>
                <Badge variant="outline">{eq.type}</Badge>
              </div>
              <span className="font-bold text-primary">${eq.pricePerHour}/hr</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{eq.description}</p>
            <div className="flex justify-between text-sm">
              <span>Total: {eq.totalQuantity}</span>
              <span className="text-primary">Available: {eq.availableQuantity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEquipment;
