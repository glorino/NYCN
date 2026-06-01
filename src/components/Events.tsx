import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

const events = [
  {
    title: 'Executive Council Meeting – Bembela TV News Report',
    date: 'May 29, 2026',
    time: 'All Day',
    location: 'Dublin, Ireland',
    description: `BEMBELA TV NEWS REPORT\nDate: 29th May 2026\n\nNational Youth Council of Nigeria (NYCN) Ireland Chapter Holds Executive Council Meeting\n\nThe National Youth Council of Nigeria (NYCN) Ireland Chapter held its Executive Council (EXCO) Meeting on 29th May 2026. The meeting was presided over by the Youth Ambassador of the NYCN Ireland Chapter, Mr. Jeffrey Oronsaye.\n\nA major highlight of the meeting was the inauguration of the newly appointed executive members. During the ceremony, official letters of appointment were presented to the new appointees, formally welcoming them into their respective positions within the chapter.\n\nThe Executive Committee also adopted the Chapter's Articles of Association as the official governing document to guide its operations, administration, and activities moving forward.\n\nMembers engaged in extensive deliberations on upcoming events and discussed various modalities for their successful planning and implementation. The meeting provided an opportunity for strategic discussions aimed at advancing the objectives of the chapter and strengthening youth engagement within the Nigerian community in Ireland.\n\nIn addition, the Youth Ambassador, Mr. Jeffrey Oronsaye, delivered an insightful lecture titled "The Sacrifice for Leadership," emphasizing the values, commitment, and responsibilities required of effective leaders.\n\nThe meeting concluded on a positive note with a dinner, providing members an opportunity for networking and fellowship.\n\nReporting for Bembela TV.`,
    image: '/events/WhatsApp Image 2026-05-31 at 7.32.15 PM.jpeg',
    images: [
      '/events/WhatsApp Image 2026-05-31 at 7.32.15 PM.jpeg',
      '/events/WhatsApp Image 2026-05-31 at 7.32.47 PM.jpeg',
    ],
    video: '/events/WhatsApp Video 2026-05-31 at 6.58.21 PM.mp4',
    category: 'Executive Meeting / Leadership',
    featured: true,
  },
  {
    title: 'World Hypertension Day',
    date: 'May 17, 2026',
    time: 'All Day',
    location: 'Online Campaign',
    description: 'A health awareness campaign for World Hypertension Day encouraging everyone, especially young Nigerians in the diaspora, to monitor and manage high blood pressure. The campaign promotes regular blood pressure checks, physical activity and exercise, healthy eating, weight management, stress reduction, and proper sleep.',
    image: '/events/WhatsApp Image 2026-05-17 at 9.38.35 AM.jpeg',
    category: 'Health Awareness / Campaign',
  },
  {
    title: 'Community Outreach',
    date: 'April 4, 2026',
    time: 'All Day',
    location: 'Dublin',
    description: 'A community outreach initiative by NYCN Ireland Chapter dedicated to supporting homeless and vulnerable individuals within the community.',
    image: '/events/WhatsApp Image 2026-05-07 at 8.55.05 AM.jpeg',
    category: 'Community Service / Outreach / Social Impact',
  },
  {
    title: 'Webinar – Immigration Challenges in Ireland',
    date: 'January 31, 2026',
    time: '5:00 AM',
    location: 'Online Webinar (Zoom)',
    description: 'An NYCN Ireland Chapter webinar addressing immigration challenges in Ireland and helping participants understand immigration rules and legal processes.',
    image: '/events/WhatsApp Image 2026-05-07 at 9.15.15 AM.jpeg',
    category: 'Webinar / Legal Awareness',
  },
  {
    title: 'Webinar – Immigration Challenges in Ireland',
    date: 'January 31, 2026',
    time: '5:00 AM',
    location: 'Online Webinar',
    description: 'A webinar featuring Attorney Mariam Olusoji discussing immigration regulations and guidance for Nigerians living in Ireland.',
    image: '/events/WhatsApp Image 2026-05-07 at 8.58.55 AM.jpeg',
    category: 'Webinar / Legal Awareness',
  },
  {
    title: 'Youth Convention – Diaspora Integration',
    date: 'December 13, 2025',
    time: '3:00 PM',
    location: 'Lucan Spa Hotel, Lucan, Co. Dublin, K78 X3H, Limerick Hall',
    description: 'A youth convention focused on discussing the challenges and opportunities surrounding diaspora integration. Hosted by NYCN Ireland Chapter with speakers, consultants, and entertainers.',
    image: '/events/WhatsApp Image 2026-05-07 at 9.20.21 AM.jpeg',
    category: 'Advocacy / Youth Convention / Community Engagement',
  },
  {
    title: 'Cloud Computing Training',
    date: 'July 27, 2025',
    time: '5:00 PM',
    location: 'Online (Zoom)',
    description: 'A free training session introducing participants to cloud computing, key Azure services, career opportunities in Azure, and live demonstrations.',
    image: '/events/WhatsApp Image 2026-05-07 at 8.57.47 AM.jpeg',
    category: 'Training / Technology Workshop',
  },
  {
    title: 'Rise Up Nigerians in Ireland and Join the Movement',
    date: 'May 31, 2025',
    time: '5:00 PM',
    location: 'Dublin (Zoom)',
    description: 'A movement-driven gathering encouraging Nigerians in Ireland to participate in nation building through diaspora youth engagement.',
    image: '/events/WhatsApp Image 2026-05-07 at 8.59.35 AM.jpeg',
    category: 'Advocacy / Community Mobilization',
  },
];

const Events = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featuredEvent = events.find((e) => e.featured);
  const otherEvents = events.filter((e) => !e.featured);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="py-24 bg-background relative"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-gold/20 text-foreground rounded-full text-sm font-medium mb-4">
            Our Events
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join Our Community Events
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with fellow Nigerian youth in Ireland through our engaging events and programs.
          </p>
        </div>

        {/* Featured Event */}
        {featuredEvent && (
          <div className={`mb-12 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="relative group rounded-3xl overflow-hidden bg-card border border-border">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Media */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  {featuredEvent.video ? (
                    <video
                      src={featuredEvent.video}
                      poster={featuredEvent.image}
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={featuredEvent.image}
                      alt={featuredEvent.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute top-4 left-4 px-4 py-2 bg-gold-gradient rounded-full text-foreground font-semibold text-sm">
                    Featured Event
                  </div>
                  {featuredEvent.images && featuredEvent.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-foreground/60 backdrop-blur-sm rounded-full text-primary-foreground text-xs font-medium">
                      +{featuredEvent.images.length - 1} more photos
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {featuredEvent.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="gold" size="lg" className="self-start">
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    {featuredEvent.video && (
                      <Button variant="outline" size="lg" className="self-start" asChild>
                        <a href={featuredEvent.video} target="_blank" rel="noopener noreferrer">
                          Watch Video
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Events Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {otherEvents.map((event, index) => (
            <div
              key={event.title}
              className={`group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 1) * 0.15}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-primary-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
