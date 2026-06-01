import { Users, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';

const stats = [
  { icon: Users, value: '5k+', label: 'Members' },
  { icon: Calendar, value: '100+', label: 'Events' },
  { icon: Award, value: 'Since 1964', label: '' },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-85" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-primary-foreground text-sm font-bold uppercase">
              BUILD THE YOUTH BUILD THE NATION
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
            National Youth Council
            <span className="block text-gradient mt-2">of Nigeria, Ireland</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-slide-up stagger-2">
            Creating opportunities for personal development, academic growth, and professional networking for Nigerian youth thriving in Ireland.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up stagger-3">
            <Button
              variant="hero"
              size="xl"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Discover More
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              asChild
            >
              <Link to="/events">
                Upcoming Events
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-slide-up stagger-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-gold" />
                <p className="text-2xl sm:text-3xl font-display font-bold text-primary-foreground">
                  {stat.value}
                </p>
                {stat.label && <p className="text-sm text-primary-foreground/60">{stat.label}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
