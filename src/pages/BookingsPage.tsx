import { useBookingStore } from '@/stores/bookingStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { CalendarPlus } from 'lucide-react';

const BookingsPage = () => {
  const { userBookings } = useBookingStore();

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">My Bookings</h1>
        <Button asChild>
          <Link to="/book">
            <CalendarPlus className="w-4 h-4 mr-2" />
            New Booking
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {userBookings.map(booking => (
          <div key={booking.id} className="p-6 rounded-xl border bg-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">{booking.court.name}</h3>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>{booking.status}</Badge>
                </div>
                <p className="text-muted-foreground">{format(new Date(booking.date), 'PPP')} • {booking.timeSlot.startTime} - {booking.timeSlot.endTime}</p>
                {booking.coach && <p className="text-sm mt-1">Coach: {booking.coach.name}</p>}
                {booking.equipment.length > 0 && (
                  <p className="text-sm mt-1 text-muted-foreground">
                    Equipment: {booking.equipment.map(e => `${e.equipment.name} x${e.quantity}`).join(', ')}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">${booking.totalPrice}</span>
              </div>
            </div>
          </div>
        ))}
        
        {userBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No bookings yet. Book your first court!</p>
            <Button asChild>
              <Link to="/book">Book Now</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
