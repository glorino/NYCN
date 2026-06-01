import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, Upload, X, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { eventsApi } from '@/lib/api';

interface EventFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  category: string;
  expectedAttendees: string;
  featured: boolean;
  imageUrl: string;
}

interface EventFormProps {
  eventId?: string; // If provided, we're editing an existing event
}

const categories = [
  'Convention',
  'Workshop',
  'Cultural',
  'Seminar',
  'Networking',
  'Training',
  'Social',
  'Other',
];

const EventForm: React.FC<EventFormProps> = ({ eventId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isEditing, setIsEditing] = useState(!!eventId);

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    category: '',
    expectedAttendees: '',
    featured: false,
    imageUrl: '',
  });

  // Load existing event data if editing
  useEffect(() => {
    if (eventId) {
      const loadEvent = async () => {
        try {
          const events = await eventsApi.getEvents();
          const event = events.find(e => e.id === eventId);
          if (event) {
            setFormData({
              title: event.title,
              date: event.date,
              startTime: event.time?.split(' - ')[0] || '',
              endTime: event.time?.split(' - ')[1] || '',
              location: event.location,
              description: event.description,
              category: event.category || '',
              expectedAttendees: event.attendees || '',
              featured: event.featured || false,
              imageUrl: event.image || '',
            });
            setImagePreview(event.image || '');
          }
        } catch (error) {
          console.error('Error loading event:', error);
          toast({
            title: "Error",
            description: "Failed to load event data",
            variant: "destructive",
          });
        }
      };
      
      loadEvent();
    }
  }, [eventId]);

  const handleInputChange = (field: keyof EventFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        handleInputChange('imageUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    handleInputChange('imageUrl', '');
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please enter an event title",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.date) {
      toast({
        title: "Missing Date",
        description: "Please select an event date",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.location.trim()) {
      toast({
        title: "Missing Location",
        description: "Please enter an event location",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Missing Description",
        description: "Please enter an event description",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const eventData = {
        title: formData.title,
        date: formData.date,
        time: formData.startTime && formData.endTime 
          ? `${formData.startTime} - ${formData.endTime}`
          : formData.startTime,
        location: formData.location,
        description: formData.description,
        category: formData.category,
        attendees: formData.expectedAttendees,
        featured: formData.featured,
        image: formData.imageUrl,
      };

      console.log('Saving event:', eventData);

      let savedEvent;
      if (isEditing && eventId) {
        // Update existing event
        savedEvent = await eventsApi.updateEvent(eventId, eventData);
      } else {
        // Create new event
        savedEvent = await eventsApi.createEvent(eventData);
      }

      console.log('Event saved:', savedEvent);

      toast({
        title: isEditing ? "Event Updated" : "Event Created",
        description: `The event has been successfully ${isEditing ? 'updated' : 'created'} and will appear on the website immediately.`,
      });

      // Navigate to dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} event. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/admin/dashboard" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="font-display text-2xl font-bold text-foreground">
                {isEditing ? 'Edit Event' : 'Create New Event'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Add the essential details about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your event in detail"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Time & Location */}
          <Card>
            <CardHeader>
              <CardTitle>Time & Location</CardTitle>
              <CardDescription>
                When and where will your event take place?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Event location or address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedAttendees">Expected Attendees</Label>
                <Input
                  id="expectedAttendees"
                  value={formData.expectedAttendees}
                  onChange={(e) => handleInputChange('expectedAttendees', e.target.value)}
                  placeholder="e.g., 100+, 500-1000"
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Image */}
          <Card>
            <CardHeader>
              <CardTitle>Event Image</CardTitle>
              <CardDescription>
                Upload a banner or flyer for your event (recommended: 1200x630px)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <Label htmlFor="image" className="cursor-pointer">
                      <span className="text-primary hover:underline">Click to upload</span>
                      <span className="text-muted-foreground"> or drag and drop</span>
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Event Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Event Settings</CardTitle>
              <CardDescription>
                Configure how your event appears on the website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Featured Event</Label>
                  <p className="text-sm text-muted-foreground">
                    Display this event prominently on the homepage
                  </p>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="variant-gold"
            >
              {isLoading ? (
                'Saving...'
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update Event' : 'Create Event'}
                </>
              )}
            </Button>

            <Link to="/admin/dashboard">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EventForm;
