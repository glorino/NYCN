import { Linkedin, Twitter, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const teamMembers = [
  {
    name: 'Amb. Collins Osazee Idahosa',
    role: 'President NYCN Diaspora',
    image: '/team/Amb. Collins Osazee Idahosa.jpg',
  },
  {
    name: 'Hon. Jeffrey Oronsaye',
    role: 'Youth Ambassador, NYCN Ireland Chapter',
    image: '/team/Hon. Jeffrey Oronsaye.jpg',
  },
  {
    name: 'Felicia Akinbuleju',
    role: 'Assistant Chairperson / Sec General',
    image: '/team/Felicia Akinbuleju.jpg',
  },
  {
    name: 'Sharon Alozie',
    role: 'Head of Protocol',
    image: '/team/Sharon Alozie.jpeg',
  },
  {
    name: 'Abisola Adegoke',
    role: 'Head of Welfare',
    image: '/team/Abisola Adegoke.jpeg',
  },
  {
    name: 'Andrew Edeki',
    role: 'Organising Secretary',
    image: '/team/Andrew Edeki.jpg',
  },
  {
    name: 'Martins Idemudia',
    role: 'Public Relations Officer',
    image: '/team/Martins Idemudia.jpg',
  },
  {
    name: 'Sunday Anjorin',
    role: 'Financial Secretary',
    image: '/team/Sunday Anjorin.jpg',
  },
  {
    name: 'Sarah Imaragbe', 
    role: 'Treasurer',
    image: '/team/Sarah Imaragbe.jpg',
  },
  {
    name: 'Vanessa Aigbekaen',
    role: 'Secretary Administration',
    image: '/team/Vanessa Aigbekaen.jpg',
  },
  {
    name: 'Goodness Chiamaka Ezeogu',
    role: 'Assistant Organising Secretary',
    image: '/team/Goodness.jpeg',
  },
];

const Team = () => {
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

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-24 bg-muted relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our Leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            Dedicated individuals working tirelessly to empower Nigerian youth in Ireland.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group relative ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Social Links (appear on hover) */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 text-center">
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
