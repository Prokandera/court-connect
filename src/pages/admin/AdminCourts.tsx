import { useState } from 'react';
import { mockCourts } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Building2, Sun, Plus } from 'lucide-react';

const AdminCourts = () => {
  const [courts, setCourts] = useState(mockCourts);

  const toggleActive = (id: string) => {
    setCourts(courts.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Courts Management</h1>
        <Button><Plus className="w-4 h-4 mr-2" />Add Court</Button>
      </div>

      <div className="grid gap-4">
        {courts.map(court => (
          <div key={court.id} className={`p-6 rounded-xl border bg-card ${court.type === 'indoor' ? 'court-indoor' : 'court-outdoor'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {court.type === 'indoor' ? <Building2 className="w-6 h-6 text-court-indoor" /> : <Sun className="w-6 h-6 text-court-outdoor" />}
                <div>
                  <h3 className="font-bold text-lg">{court.name}</h3>
                  <p className="text-sm text-muted-foreground">{court.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={court.type === 'indoor' ? 'default' : 'secondary'}>{court.type}</Badge>
                <span className="font-bold">${court.basePrice}/hr</span>
                <Switch checked={court.isActive} onCheckedChange={() => toggleActive(court.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourts;
