import { Target, Eye, Megaphone, Heart, GraduationCap, Handshake, Shield, Lightbulb, BarChart3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To build a strong, supportive, and empowered community of young Nigerians in Ireland who are equipped with the skills, knowledge, and network needed to thrive and contribute meaningfully to society.',
    color: 'gold',
  },
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To encourage and support young Nigerians in Ireland in developing their skills, empowering them for personal and professional growth, and helping them become valuable contributors to their communities. We are also committed to creating awareness and actively supporting the fight against domestic violence, especially abuse against women, children, and vulnerable individuals in society.',
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'Advocacy',
    description: 'We promote awareness campaigns addressing domestic violence and abuse. We partner with relevant organizations to educate and support victims, and stand firmly against all forms of abuse in society.',
    color: 'primary',
  },
];

const values = [
  { icon: Heart, label: 'Community' },
  { icon: GraduationCap, label: 'Empowerment' },
  { icon: Shield, label: 'Advocacy' },
  { icon: Handshake, label: 'Collaboration' },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-muted relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[200px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            The NYCN Ireland Chapter
          </h2>
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">NYCN Ireland Chapter (RN:794640)</strong> serves as the cornerstone for Nigerian youth in Ireland, helping them navigate the challenges of living abroad while staying connected to their roots.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                card.color === 'gold' ? 'bg-gold-gradient shadow-gold' : 'bg-primary'
              }`}>
                <card.icon className={`w-7 h-7 ${card.color === 'gold' ? 'text-foreground' : 'text-primary-foreground'}`} />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>

              {/* Hover decoration */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Values Strip */}
        <div className={`flex flex-wrap justify-center gap-4 mb-20 ${isVisible ? 'animate-slide-up stagger-4' : 'opacity-0'}`}>
          {values.map((value) => (
            <div
              key={value.label}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border"
            >
              <value.icon className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">{value.label}</span>
            </div>
          ))}
        </div>

        {/* Strategic Objectives */}
        <div className={`text-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Strategic Plan
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Our Strategic Objectives
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className={`group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-primary">
              <Heart className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Community Engagement & Participation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Foster an active and inclusive platform for communication and networking. Encourage consistent member participation in discussions, events, and initiatives.
            </p>
          </div>

          <div className={`group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gold-gradient">
              <Lightbulb className="w-7 h-7 text-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Skill Development & Empowerment</h3>
            <p className="text-muted-foreground leading-relaxed">
              Provide access to training, workshops, and mentorship opportunities. Support career growth, entrepreneurship, and personal development.
            </p>
          </div>

          <div className={`group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-primary">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Awareness & Advocacy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Promote awareness campaigns addressing domestic violence and abuse. Partner with relevant organizations to educate and support victims of abuse.
            </p>
          </div>

          <div className={`group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gold-gradient">
              <Handshake className="w-7 h-7 text-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Collaboration & Partnerships</h3>
            <p className="text-muted-foreground leading-relaxed">
              Build relationships with local organizations, professionals, and institutions. Create opportunities for internships, volunteering, and community service.
            </p>
          </div>
        </div>

        {/* Key Initiatives */}
        <div className={`text-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Initiatives
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Key Initiatives
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Monthly Engagement</h3>
            <p className="text-sm text-muted-foreground">Virtual discussions, networking, knowledge sharing, and member spotlight stories.</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Training & Development</h3>
            <p className="text-sm text-muted-foreground">Webinars on career skills, CV writing, job strategies, and mentorship programs.</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
              <Megaphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Advocacy Campaigns</h3>
            <p className="text-sm text-muted-foreground">Awareness drives on domestic violence, educational content, and safe-space discussions.</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Community Impact</h3>
            <p className="text-sm text-muted-foreground">Volunteer initiatives, cultural integration programs, and social contribution projects.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
