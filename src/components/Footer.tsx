import { Facebook, Twitter, Instagram, Linkedin, Youtube, Music } from 'lucide-react';
import { useState } from 'react';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsOfServiceModal from './TermsOfServiceModal';

// Logo path - will use public folder
const LOGO_PATH = '/nycn-logo.png';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/people/National-Youth-Council-of-Nigeria-Nycn-Ireland-chapter/61575719769560/', label: 'Facebook' },
  { icon: Twitter, href: 'https://nycn.ie/#', label: 'Twitter' },
  { icon: Instagram, href: 'https://nycn.ie/#', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/national-youth-council-of-nigeria-ireland-chapter-a05476399?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://nycn.ie/#', label: 'YouTube' },
  { icon: Music, href: 'https://vm.tiktok.com/ZSAR39sNx/', label: 'TikTok' },
];

const footerLinks = {
  'Quick Links': [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ],
  'Resources': [
    { label: 'Membership', href: '#' },
    { label: 'Newsletter', href: '#' },
    { label: 'Gallery', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
};

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <footer className="bg-hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={LOGO_PATH} 
                alt="NYCN Ireland Logo" 
                className="h-14 w-14 object-contain"
                onError={(e) => {
                  // Hide image if it fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <p className="font-display font-bold text-lg">NYCN Ireland</p>
                <p className="text-sm opacity-80">National Youth Council of Nigeria</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              <span className="font-bold uppercase">BUILD THE YOUTH BUILD THE NATION.</span> Empowering Nigerian youth to thrive academically, professionally, and socially while maintaining pride in their Nigerian heritage.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-lg mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} NYCN Ireland Chapter (RN:794640). All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <button 
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-primary-foreground transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setIsTermsOpen(true)}
                className="hover:text-primary-foreground transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <PrivacyPolicyModal open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen} />
    <TermsOfServiceModal open={isTermsOpen} onOpenChange={setIsTermsOpen} />
    </>
  );
};

export default Footer;
