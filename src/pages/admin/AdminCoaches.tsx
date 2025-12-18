import { mockCoaches } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Star } from 'lucide-react';
import { useState } from 'react';

const AdminCoaches = () => {
  const [coaches, setCoaches] = useState(mockCoaches);

  const toggleActive = (id: string) => {
    setCoaches(coaches.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Coach Management</h1>
        <Button><Plus className="w-4 h-4 mr-2" />Add Coach</Button>
      </div>

      <div className="space-y-4">
        {coaches.map(coach => (
          <div key={coach.id} className="p-6 rounded-xl border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground">
                  {coach.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{coach.name}</h3>
                  <Badge variant="secondary">{coach.specialization}</Badge>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-sport-yellow text-sport-yellow" />
                    <span className="text-sm">{coach.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">${coach.pricePerHour}/hr</span>
                <Switch checked={coach.isActive} onCheckedChange={() => toggleActive(coach.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCoaches;
