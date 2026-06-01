import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, PartyPopper, Heart, Facebook, Twitter, Instagram, Linkedin, Youtube, Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/people/National-Youth-Council-of-Nigeria-Nycn-Ireland-chapter/61575719769560/', label: 'Facebook' },
  { icon: Twitter, href: 'https://nycn.ie/#', label: 'Twitter' },
  { icon: Instagram, href: 'https://nycn.ie/#', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/national-youth-council-of-nigeria-ireland-chapter-a05476399?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://nycn.ie/#', label: 'YouTube' },
  { icon: Music, href: 'https://vm.tiktok.com/ZSAR39sNx/', label: 'TikTok' },
];

const IRISH_COUNTIES = [
  'Antrim', 'Armagh', 'Carlow', 'Cavan', 'Clare', 'Cork', 'Derry', 'Donegal',
  'Down', 'Dublin', 'Fermanagh', 'Galway', 'Kerry', 'Kildare', 'Kilkenny',
  'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath',
  'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Tyrone',
  'Waterford', 'Westmeath', 'Wexford', 'Wicklow'
];

interface JoinUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinUsModal = ({ open, onOpenChange }: JoinUsModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    county: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setIsSubmitted(true);

      toast({
        title: "Registration Successful!",
        description: "Welcome to NYCN Ireland! We'll be in touch soon.",
      });
    } catch (error) {
      console.error('Error submitting membership form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit registration. Please try again later.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: '', whatsapp: '', email: '', county: '' });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border overflow-hidden">
        {!isSubmitted ? (
          <>
            <DialogHeader className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-gradient flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-foreground" />
              </div>
              <DialogTitle className="text-2xl font-display text-center text-foreground">
                Join Our Community
              </DialogTitle>
              <p className="text-center text-muted-foreground text-sm">
                Become part of the Nigerian Youth Council Network in Ireland
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-foreground">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="+353 XX XXX XXXX"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="county" className="text-foreground">County in Ireland</Label>
                <Select
                  value={formData.county}
                  onValueChange={(value) => setFormData({ ...formData, county: value })}
                  required
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select your county" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border max-h-60">
                    {IRISH_COUNTIES.map((county) => (
                      <SelectItem key={county} value={county} className="cursor-pointer">
                        {county}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full mt-6"
                disabled={isSubmitting || !formData.fullName || !formData.whatsapp || !formData.email || !formData.county}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : (
                  'Join Now'
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center animate-scale-in">
            {/* Celebration Animation */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gold/20 animate-ping" />
              </div>
              <div className="relative w-24 h-24 mx-auto rounded-full bg-gold-gradient flex items-center justify-center mb-6">
                <PartyPopper className="w-12 h-12 text-foreground animate-bounce" />
              </div>
            </div>

            {/* Floating confetti */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-float"
                  style={{
                    backgroundColor: ['hsl(var(--gold))', 'hsl(var(--primary))', 'hsl(var(--secondary))'][i % 3],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            <h3 className="font-display text-3xl font-bold text-foreground mb-3">
              Welcome to the Family! 🎉
            </h3>
            <p className="text-muted-foreground mb-2">
              You're now part of the NYCN Ireland community.
            </p>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mb-6">
              <Heart className="w-4 h-4 text-destructive fill-destructive" />
              Together, we rise stronger
            </p>

            <div className="bg-muted rounded-xl p-4 mb-6">
              <p className="text-sm text-foreground font-medium">
                Hi {formData.fullName.split(' ')[0]}! 👋
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                We're excited to have you from <span className="text-primary font-medium">{formData.county}</span>.
                Get ready for amazing opportunities ahead!
              </p>
            </div>

            {/* Social Media Section */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">
                Remember to follow our socials! 📱
              </p>
              <div className="flex items-center justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Stay connected for updates, events, and community news
              </p>
            </div>

            <Button variant="default" size="lg" onClick={handleClose} className="w-full">
              Start Exploring
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinUsModal;
