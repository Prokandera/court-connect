import { mockBookings } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const BookingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-display text-3xl font-bold mb-8">My Bookings</h1>
      
      <div className="space-y-4">
        {mockBookings.map(booking => (
          <div key={booking.id} className="p-6 rounded-xl border bg-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">{booking.court.name}</h3>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>{booking.status}</Badge>
                </div>
                <p className="text-muted-foreground">{format(new Date(booking.date), 'PPP')} • {booking.timeSlot.startTime} - {booking.timeSlot.endTime}</p>
                {booking.coach && <p className="text-sm mt-1">Coach: {booking.coach.name}</p>}
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">${booking.totalPrice}</span>
              </div>
            </div>
          </div>
        ))}
        
        {mockBookings.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No bookings yet. Book your first court!</div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
