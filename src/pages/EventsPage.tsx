import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star,
  Heart,
  Share2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Eye,
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { eventsApi } from '@/lib/api';
import EventDetailModal from '@/components/EventDetailModal';
import { useToast } from '@/hooks/use-toast';

const EventsPage = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [savedEvents, setSavedEvents] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterAndSortEvents();
  }, [events, searchQuery, selectedCategory, sortBy]);

  const fetchEvents = async () => {
    try {
      const data = await eventsApi.getEvents();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortEvents = () => {
    let filtered = [...events];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popularity':
          return (b.attendees || '0').localeCompare(a.attendees || '0');
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(events.map(e => e.category).filter(Boolean)));
    return ['all', ...cats];
  }, [events]);

  const featuredEvent = events.find(e => e.featured);
  const upcomingEvents = filteredEvents.filter(e => !e.featured);
  const pastEvents = filteredEvents.filter(e => new Date(e.date) < new Date());

  const toggleSaveEvent = (eventId: string) => {
    setSavedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const shareEvent = (event: any) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    }
  };

  const openEventModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const addToCalendar = (event: any) => {
    try {
      // Parse event date and time
      const eventDate = new Date(event.date);
      const [startTime, endTime] = event.time ? event.time.split(' - ') : ['9:00 AM', '5:00 PM'];
      
      // Convert time to 24-hour format
      const convertTo24Hour = (timeStr: string) => {
        const [time, period] = timeStr.trim().split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const periodUpper = period.toUpperCase();
        
        if (periodUpper === 'PM' && hours < 12) {
          return hours + 12;
        } else if (periodUpper === 'AM' && hours === 12) {
          return 0;
        }
        return hours;
      };
      
      const startHour = convertTo24Hour(startTime);
      const endHour = convertTo24Hour(endTime);
      
      // Create date objects for start and end times
      const startDate = new Date(eventDate);
      startDate.setHours(startHour, 0, 0, 0);
      
      const endDate = new Date(eventDate);
      endDate.setHours(endHour, 0, 0, 0);
      
      // Format dates for Google Calendar
      const formatForGoogleCalendar = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };
      
      // Create Google Calendar URL
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatForGoogleCalendar(startDate)}/${formatForGoogleCalendar(endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
      
      // Open in new tab
      window.open(googleCalendarUrl, '_blank');
      
      toast({
        title: "Calendar Event Created!",
        description: `${event.title} has been added to your Google Calendar.`,
      });
    } catch (error) {
      console.error('Error adding to calendar:', error);
      toast({
        title: "Calendar Error",
        description: "Failed to add event to calendar. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-primary/20 animate-ping"></div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Loading amazing events...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=90')`,
              filter: 'brightness(0.4) saturate(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/90" />
          
          {/* Subtle floating shapes with reduced opacity */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-10 w-40 sm:w-80 h-40 sm:h-80 bg-gold/10 rounded-full blur-3xl"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 bg-gold-gradient text-foreground px-4 py-2 rounded-full mb-6 drop-shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold">Upcoming Events</span>
            </motion.div>
            
            <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
              NYCN Ireland Events
            </h1>
            
            <p className="text-base sm:text-xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-lg font-medium px-4">
              Join our vibrant community for inspiring events, workshops, and cultural celebrations across Ireland
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="variant-gold" onClick={() => {
                  // Scroll to events section
                  const eventsSection = document.getElementById('events-section');
                  if (eventsSection) {
                    eventsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  Explore Events
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" onClick={() => {
                  // Create a calendar event for the next upcoming event
                  const upcomingEvent = filteredEvents.find(event => new Date(event.date) >= new Date());
                  if (upcomingEvent) {
                    addToCalendar(upcomingEvent);
                  } else {
                    toast({
                      title: "No Upcoming Events",
                      description: "There are no upcoming events to add to your calendar.",
                      variant: "destructive"
                    });
                  }
                }}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Event */}
      {featuredEvent && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
              >
                <Star className="w-4 h-4" />
                <span className="font-semibold">Featured Event</span>
              </motion.div>
              <h2 className="font-display text-4xl font-bold mb-4">Don't Miss This</h2>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <Card className="overflow-hidden border-2 border-gold/20 shadow-2xl">
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
                  
                  {/* Floating badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-gold-gradient text-foreground">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    {featuredEvent.category && (
                      <Badge variant="secondary">{featuredEvent.category}</Badge>
                    )}
                  </div>

                  {/* Event details overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="font-display text-xl sm:text-3xl font-bold text-foreground mb-2 line-clamp-2">
                      {featuredEvent.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {featuredEvent.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {featuredEvent.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        {featuredEvent.location}
                      </div>
                      {featuredEvent.attendees && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          {featuredEvent.attendees}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredEvent.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="variant-gold flex-1" onClick={() => openEventModal(featuredEvent)}>
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleSaveEvent(featuredEvent.id)}
                        className={savedEvents.has(featuredEvent.id) ? 'text-primary' : ''}
                      >
                        <Heart className={`w-4 h-4 ${savedEvents.has(featuredEvent.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="outline" size="icon" onClick={() => shareEvent(featuredEvent)}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Filters and Search */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="py-12 bg-card/50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredEvents.length} of {events.length} events
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Events Grid/List */}
      <motion.section
        id="events-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-12"
      >
        <div className="container mx-auto px-4">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">No Events Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSortBy('date');
              }}>
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              <AnimatePresence>
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    layout
                  >
                    <Card className="group overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
                      {viewMode === 'grid' ? (
                        /* Grid View */
                        <div>
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                            
                            <div className="absolute top-3 right-3">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => toggleSaveEvent(event.id)}
                                className={`bg-background/80 backdrop-blur-sm ${savedEvents.has(event.id) ? 'text-primary' : ''}`}
                              >
                                <Heart className={`w-3 h-3 ${savedEvents.has(event.id) ? 'fill-current' : ''}`} />
                              </Button>
                            </div>

                            {event.category && (
                              <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
                                {event.category}
                              </Badge>
                            )}

                            <div className="absolute bottom-3 left-3 right-3">
                              <h3 className="font-display text-lg font-bold text-foreground line-clamp-2">
                                {event.title}
                              </h3>
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </div>
                              {event.attendees && (
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  {event.attendees}
                                </div>
                              )}
                            </div>

                            <Button className="w-full variant-gold" onClick={() => openEventModal(event)}>
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </CardContent>
                        </div>
                      ) : (
                        /* List View */
                        <div className="flex flex-col sm:flex-row gap-4 p-4">
                          <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-display text-lg font-bold text-foreground line-clamp-1">
                                {event.title}
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSaveEvent(event.id)}
                                className={`ml-2 flex-shrink-0 ${savedEvents.has(event.id) ? 'text-primary' : ''}`}
                              >
                                <Heart className={`w-4 h-4 ${savedEvents.has(event.id) ? 'fill-current' : ''}`} />
                              </Button>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {event.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </div>
                              {event.attendees && (
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {event.attendees}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex sm:flex-col gap-2 sm:flex-shrink-0">
                            <Button size="sm" className="variant-gold flex-1 sm:flex-none" onClick={() => openEventModal(event)}>
                              Learn More
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => shareEvent(event)}>
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-primary/5"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Calendar, label: 'Total Events', value: events.length },
              { icon: Users, label: 'Total Attendees', value: '2,500+' },
              { icon: Star, label: 'Featured Events', value: events.filter(e => e.featured).length },
              { icon: TrendingUp, label: 'This Month', value: events.filter(e => {
                const eventDate = new Date(e.date);
                const currentDate = new Date();
                return eventDate.getMonth() === currentDate.getMonth() && 
                       eventDate.getFullYear() === currentDate.getFullYear();
              }).length },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center p-6 bg-background/50 backdrop-blur-sm border border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-display text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeEventModal}
        isSaved={selectedEvent ? savedEvents.has(selectedEvent.id) : false}
        onToggleSave={() => selectedEvent && toggleSaveEvent(selectedEvent.id)}
      />
    </div>
  );
};

export default EventsPage;
