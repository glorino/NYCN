import { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Heart, 
  ArrowRight,
  Star,
  Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface EventDetailModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

const EventDetailModal = ({ event, isOpen, onClose, isSaved, onToggleSave }: EventDetailModalProps) => {
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Event link copied to clipboard",
      });
    }
  };

  const handleRegister = async () => {
    setIsRegistering(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRegistering(false);
    toast({
      title: "Registration Successful!",
      description: "You've been registered for this event. Check your email for confirmation.",
    });
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0 overflow-hidden border-0 bg-background">
        {/* Scrollable container */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 z-50 bg-background/90 hover:bg-background"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Full Image - No cropping */}
          <div className="w-full bg-black">
            {event.video ? (
              <video
                src={event.video}
                poster={event.image}
                controls
                preload="metadata"
                className="w-full"
              />
            ) : (
              <img
                src={event.image}
                alt={event.title}
                className="w-full"
              />
            )}
          </div>

          {/* Content below image */}
          <div className="p-5 md:p-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {event.featured && (
                <Badge className="bg-gold-gradient text-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              {event.category && (
                <Badge variant="secondary">{event.category}</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3">
              {event.title}
            </h1>

            {/* Date & Time */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>{event.time || 'TBD'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button 
                onClick={handleRegister}
                disabled={isRegistering}
                className="variant-gold"
              >
                {isRegistering ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={onToggleSave}
                className={isSaved ? 'text-primary' : ''}
              >
                <Heart className={`w-4 h-4 mr-1 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>

            {/* Full Description */}
            <div className="mb-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-3">About This Event</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
                {event.description}
              </div>
            </div>

            {/* Additional Photos - Full Size */}
            {event.images && event.images.length > 0 && (
              <div className="mb-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-3">Event Photos</h2>
                <div className="space-y-3">
                  {event.images.map((img: string, idx: number) => (
                    <div key={idx} className="rounded-lg overflow-hidden border border-border">
                      <img
                        src={img}
                        alt={`${event.title} - Photo ${idx + 1}`}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video - Full Size */}
            {event.video && (
              <div className="mb-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-3">Event Video</h2>
                <div className="rounded-lg overflow-hidden border border-border bg-black">
                  <video
                    src={event.video}
                    poster={event.image}
                    controls
                    preload="metadata"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Event Details Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Card className="border-primary/20">
                <CardContent className="p-3 text-center">
                  <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-xs font-medium text-foreground truncate">{event.location}</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-3 text-center">
                  <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-xs font-medium text-foreground">{event.date}</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-3 text-center">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className="text-xs font-medium text-foreground">{event.attendees || 'All Welcome'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
