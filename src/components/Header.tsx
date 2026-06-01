import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import JoinUsModal from './JoinUsModal';

// Logo path - will use public folder or assets folder
const LOGO_PATH = '/nycn-logo.png';

const navLinks = [
  { href: '/', label: 'Home', isPage: true },
  { href: '#about', label: 'About', isPage: false },
  { href: '/events', label: 'Events', isPage: true },
  { href: '/blog', label: 'Blog', isPage: true },
  { href: '/team', label: 'Team', isPage: true },
  { href: '#contact', label: 'Contact', isPage: false },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const handleNavClick = (href: string, isPage: boolean) => {
    setIsMobileMenuOpen(false);
    if (!isPage && !isHomePage) {
      // Navigate to home then scroll
      window.location.href = '/' + href;
    } else if (!isPage) {
      document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? 'glass border-b border-border shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <img 
              src={LOGO_PATH} 
              alt="NYCN Ireland Logo" 
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain group-hover:scale-105 transition-transform"
              onError={(e) => {
                // Hide image if it fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className={`font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary transition-colors ${isScrolled || !isHomePage ? 'text-primary' : 'text-primary'}`}>
              NYCN Ireland
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-primary/10 ${
                    isScrolled || !isHomePage ? 'text-foreground' : 'text-primary-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={isHomePage ? link.href : '/' + link.href}
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                      handleNavClick(link.href, false);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-primary/10 ${
                    isScrolled || !isHomePage ? 'text-foreground' : 'text-primary-foreground'
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <Button
            variant={isScrolled || !isHomePage ? 'default' : 'heroOutline'}
            size="lg"
            className="hidden md:inline-flex"
            onClick={() => setIsJoinModalOpen(true)}
          >
            Join Us
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 ${isScrolled || !isHomePage ? 'text-foreground' : 'text-primary-foreground'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass border-b border-border animate-slide-up">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                link.isPage ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-4 py-3 rounded-lg font-medium text-foreground hover:bg-primary/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={isHomePage ? link.href : '/' + link.href}
                    className="px-4 py-3 rounded-lg font-medium text-foreground hover:bg-primary/10 transition-colors"
                    onClick={(e) => {
                      if (isHomePage) {
                        e.preventDefault();
                        handleNavClick(link.href, false);
                      }
                    }}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <Button className="mt-2" onClick={() => {
                setIsMobileMenuOpen(false);
                setIsJoinModalOpen(true);
              }}>
                Join Us
              </Button>
            </nav>
          </div>
        )}
      </header>

      <JoinUsModal open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen} />
    </>
  );
};

export default Header;
