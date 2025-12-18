import { Building2, Package, Users, DollarSign, Calendar } from 'lucide-react';
import { mockCourts, mockEquipment, mockCoaches, mockBookings } from '@/data/mockData';

const AdminDashboard = () => {
  const stats = [
    { label: 'Active Courts', value: mockCourts.filter(c => c.isActive).length, icon: Building2, color: 'text-court-indoor' },
    { label: 'Equipment Items', value: mockEquipment.length, icon: Package, color: 'text-primary' },
    { label: 'Active Coaches', value: mockCoaches.filter(c => c.isActive).length, icon: Users, color: 'text-accent' },
    { label: "Today's Bookings", value: mockBookings.length, icon: Calendar, color: 'text-sport-orange' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="p-6 rounded-xl border bg-card">
            <div className="flex items-center gap-3">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-xl border bg-card">
        <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
        <p className="text-muted-foreground">Use the sidebar to manage courts, equipment, coaches, and pricing rules.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
