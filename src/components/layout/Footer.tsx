import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl">🏸</span>
              </div>
              <span className="font-display font-bold text-xl">CourtBook</span>
            </div>
            <p className="text-sm opacity-80">
              Book badminton courts, rent equipment, and train with professional coaches.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/book" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                Book a Court
              </Link>
              <Link to="/bookings" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                My Bookings
              </Link>
              <Link to="/auth" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                Login / Register
              </Link>
            </div>
          </div>
          
          {/* Facilities */}
          <div>
            <h4 className="font-bold mb-4">Our Facilities</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p>2 Indoor Courts</p>
              <p>2 Outdoor Courts</p>
              <p>Equipment Rental</p>
              <p>Professional Coaching</p>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p>123 Sports Avenue</p>
              <p>Badminton City, BC 12345</p>
              <p>contact@courtbook.com</p>
              <p>(555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} CourtBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
