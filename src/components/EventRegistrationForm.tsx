import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Award, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { eventsApi } from '@/lib/api';

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle: string;
}

const EventRegistrationForm = ({ eventId, eventTitle }: EventRegistrationFormProps) => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [expectations, setExpectations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await eventsApi.registerForEvent({
        firstName,
        email,
        phone,
        expectations,
        eventId,
        eventTitle,
      });

      setIsSuccess(true);
      toast({
        title: 'Registration Successful!',
        description: 'You have been registered. Check your email for confirmation.',
      });
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          You're Registered!
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Thank you, {firstName}. A confirmation email is on its way. A Certificate of Participation will be issued to all attendees.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-lg p-3">
        <Award className="w-5 h-5 text-gold flex-shrink-0" />
        <p className="text-xs sm:text-sm text-foreground font-medium">
          Certificate of Participation will be issued to all registered attendees.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-firstName" className="text-foreground">First Name</Label>
        <Input
          id="reg-firstName"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="bg-background border-border focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email" className="text-foreground">Email</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background border-border focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-phone" className="text-foreground">Phone Number</Label>
        <Input
          id="reg-phone"
          type="tel"
          placeholder="+353 XX XXX XXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="bg-background border-border focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-expectations" className="text-foreground">Expectations</Label>
        <Textarea
          id="reg-expectations"
          placeholder="What do you hope to gain from this event?"
          value={expectations}
          onChange={(e) => setExpectations(e.target.value)}
          className="bg-background border-border focus:border-primary min-h-[90px]"
        />
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full"
        disabled={isSubmitting || !firstName || !email || !phone}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Registering...
          </span>
        ) : (
          'Register for Event'
        )}
      </Button>
    </form>
  );
};

export default EventRegistrationForm;
