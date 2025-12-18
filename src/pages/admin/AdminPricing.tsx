import { mockPricingRules } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const AdminPricing = () => {
  const [rules, setRules] = useState(mockPricingRules);

  const toggleActive = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Pricing Rules</h1>
        <Button><Plus className="w-4 h-4 mr-2" />Add Rule</Button>
      </div>

      <div className="space-y-4">
        {rules.map(rule => (
          <div key={rule.id} className="p-6 rounded-xl border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold">{rule.name}</h3>
                  <Badge>{rule.type.replace('_', ' ')}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
                {rule.multiplier && <p className="text-sm text-accent mt-1">+{Math.round((rule.multiplier - 1) * 100)}% to base price</p>}
              </div>
              <Switch checked={rule.isActive} onCheckedChange={() => toggleActive(rule.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPricing;
