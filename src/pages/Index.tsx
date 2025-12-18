import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Sun, Users, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockCourts, mockCoaches } from '@/data/mockData';

const Index = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Book Your <span className="text-primary">Badminton</span> Court Today
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              4 professional courts, quality equipment rentals, and expert coaches. 
              Book everything in one place with dynamic pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/book">
                  Book Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth?mode=register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -left-20 bottom-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      </section>

      {/* Courts Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Our Courts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCourts.map((court) => (
              <div key={court.id} className={`p-6 rounded-xl border-2 bg-background ${court.type === 'indoor' ? 'court-indoor' : 'court-outdoor'}`}>
                <div className="flex items-center gap-2 mb-3">
                  {court.type === 'indoor' ? <Building2 className="w-5 h-5 text-court-indoor" /> : <Sun className="w-5 h-5 text-court-outdoor" />}
                  <h3 className="font-bold text-lg">{court.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{court.description}</p>
                <div className="text-2xl font-bold text-primary">${court.basePrice}<span className="text-sm text-muted-foreground">/hr</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Expert Coaches</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockCoaches.map((coach) => (
              <div key={coach.id} className="p-6 rounded-xl border bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground">
                    {coach.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{coach.name}</h3>
                    <p className="text-sm text-muted-foreground">{coach.specialization}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{coach.bio}</p>
                <div className="text-xl font-bold text-primary">${coach.pricePerHour}<span className="text-sm text-muted-foreground">/hr</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <Building2 className="w-12 h-12 mx-auto" />
              <h3 className="font-bold text-xl">4 Courts</h3>
              <p className="opacity-80">2 indoor & 2 outdoor professional courts</p>
            </div>
            <div className="space-y-3">
              <Package className="w-12 h-12 mx-auto" />
              <h3 className="font-bold text-xl">Equipment Rental</h3>
              <p className="opacity-80">Rackets and shoes available for rent</p>
            </div>
            <div className="space-y-3">
              <Users className="w-12 h-12 mx-auto" />
              <h3 className="font-bold text-xl">Pro Coaches</h3>
              <p className="opacity-80">Train with certified professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Book your court, add equipment, and schedule a coach session all in one booking.</p>
          <Button size="lg" asChild>
            <Link to="/book">Start Booking <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
