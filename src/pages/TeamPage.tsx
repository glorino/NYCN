import { Linkedin, Twitter, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const teamMembers = [
  {
    name: 'Amb. Collins Osazee Idahosa',
    role: 'President NYCN Diaspora',
    image: '/team/Amb. Collins Osazee Idahosa.jpg',
    bio: 'Leading the European chapter with vision and dedication to youth empowerment.',
  },
  {
    name: 'Hon. Jeffrey Oronsaye',
    role: 'Youth Ambassador, NYCN Ireland Chapter',
    image: '/team/Hon. Jeffrey Oronsaye.jpg',
    bio: 'Driving community initiatives and fostering connections across Ireland.',
  },
  {
    name: 'Felicia Akinbuleju',
    role: 'Assistant Chairperson / Sec General',
    image: '/team/Felicia Akinbuleju.jpg',
    bio: 'Supporting leadership and coordinating community programs.',
  },
  {
    name: 'Sharon Alozie',
    role: 'Head of Protocol',
    image: '/team/Sharon Alozie.jpeg',
    bio: 'Managing protocol and coordinating official engagements.',
  },
  {
    name: 'Abisola Adegoke',
    role: 'Head of Welfare',
    image: '/team/Abisola Adegoke.jpeg',
    bio: 'Supporting member welfare and community well-being.',
  },
  {
    name: 'Andrew Edeki',
    role: 'Organising Secretary',
    image: '/team/Andrew Edeki.jpg',
    bio: 'Managing events and ensuring smooth organizational operations.',
  },
  {
    name: 'Martins Idemudia',
    role: 'Public Relations Officer',
    image: '/team/Martins Idemudia.jpg',
    bio: 'Managing communications and building public awareness.',
  },
  {
    name: 'Sunday Anjorin',
    role: 'Financial Secretary',
    image: '/team/Sunday Anjorin.jpg',
    bio: 'Overseeing financial records and budgeting.',
  },
  {
    name: 'Sarah Imaragbe',
    role: 'Treasurer',
    image: '/team/Sarah Imaragbe.jpg',
    bio: 'Managing community funds and financial planning.',
  },
  {
    name: 'Vanessa Aigbekaen',
    role: 'Secretary Administration',
    image: '/team/Vanessa Aigbekaen.jpg',
    bio: 'Managing administrative affairs and organizational coordination.',
  },
];

const TeamPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-hero-gradient text-primary-foreground py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              Meet Our Team
            </h1>
            <p className={`text-xl text-primary-foreground/90 max-w-2xl mx-auto ${isVisible ? 'animate-slide-up stagger-1' : 'opacity-0'}`}>
              Dedicated leaders working tirelessly to empower Nigerian youth in Ireland.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Leadership Section */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Our Leadership
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`group ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Social links on hover */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/40 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/40 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/40 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center">
                    <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>

                  {/* Accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Team CTA */}
        <section className="text-center py-16 bg-muted rounded-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We're always looking for passionate individuals who want to make a difference in the Nigerian youth community in Ireland.
          </p>
          <Link 
            to="/#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </Link>
        </section>
      </main>
    </div>
  );
};

export default TeamPage;
