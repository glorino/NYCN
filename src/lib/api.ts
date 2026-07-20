// Real API service for Vercel deployment
// Uses Vercel serverless functions with Vercel KV storage

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image?: string;
  images?: string[];
  video?: string;
  category?: string;
  attendees?: string;
  featured?: boolean;
  certificate?: boolean;
  created_at?: string;
}

// API base URL
const API_BASE = '/api/events';

export const eventsApi = {
  // Get all events
  async getEvents(): Promise<Event[]> {
    try {
      const response = await fetch(API_BASE);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const events = await response.json();
      console.log('Fetched events from backend:', events);
      return Array.isArray(events) ? events : [];
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to default events if API fails
      return this.getDefaultEvents();
    }
  },

  // Create new event
  async createEvent(eventData: Omit<Event, 'id' | 'created_at'>): Promise<Event> {
    console.log('createEvent: sending to backend:', eventData);
    
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const newEvent = await response.json();
      console.log('Event created successfully:', newEvent);
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Update event
  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
    try {
      const response = await fetch(API_BASE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...eventData }),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  // Delete event
  async deleteEvent(id: string): Promise<void> {
    try {
      const response = await fetch(API_BASE, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Register for an event
  async registerForEvent(registration: {
    firstName: string;
    email: string;
    phone: string;
    expectations?: string;
    eventId: string;
    eventTitle?: string;
  }): Promise<{ success: boolean; message: string }> {
    const response = await fetch('/api/event-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registration),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to register for event');
    }

    return response.json();
  },

  // Fallback default events
  getDefaultEvents(): Event[] {
    return [
      {
        id: '12',
        title: 'NYCN Ireland Community Empowerment Forum 2026',
        date: '2026-09-26',
        time: '10:00 AM - 4:00 PM',
        location: 'Dublin, Ireland',
        description: `NYCN IRELAND COMMUNITY EMPOWERMENT FORUM 2026\n\nThe National Youth Council of Nigeria (NYCN) Ireland Chapter cordially invites you to the Community Empowerment Forum 2026 — a day of learning, networking, and community building for Nigerians and friends of Nigeria across Ireland.\n\nTheme: Empowering Youths, Strengthening Communities\n\nWHAT TO EXPECT:\n• Inspiring keynote speakers and panel discussions\n• Practical workshops on careers, entrepreneurship, and well-being\n• Networking with community leaders and professionals\n• Cultural showcase and community celebration\n\nCERTIFICATE OF PARTICIPATION\nA Certificate of Participation will be issued to all registered attendees who take part in the forum. This certificate recognises your engagement and contribution to the NYCN Ireland community.\n\nRegistration is FREE. Spaces are limited — secure your place today!`,
        image: '/event/WhatsApp Image 2026-07-20 at 1.31.27 PM.jpeg',
        category: 'Community Forum / Empowerment',
        attendees: '',
        upcoming: true,
        certificate: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '11',
        title: 'African Health Summit – Dublin',
        date: '2026',
        time: 'All Day',
        location: 'Dublin, Ireland',
        description: `AFRICAN HEALTH SUMMIT – DUBLIN\n\nWe were delighted to attend the African Health Summit in Dublin as a Community Partner.\n\nIt was also a great privilege to join distinguished dignitaries and community leaders, including the Kenyan Ambassador to Ireland, H.E. Ambassador George M. Orina; representatives from Cork County Council; Councillor Uruemu Adejinmi, representing Longford; and Councillor Honore Kamegni, Ireland and representative for Cork South East, and of course Miss Sharon Alozie, Head of Protocol NYCN Ireland Chapter, in presenting prestigious awards to deserving winners.\n\nAttending this remarkable event created valuable opportunities for networking, collaboration, and meaningful conversations about embracing and encouraging youth involvement in healthcare, health, and well-being at all levels.\n\nA special thank you to Olayinka Aremu and all the organisers for believing in the vision and for their dedication to creating a platform that celebrates excellence, strengthens communities, and promotes a healthier future for all.\n\nWe are proud to have been part of this inspiring occasion and look forward to building on the connections and opportunities created.\n\n#AfricanHealthSummit #Dublin #CommunityPartners #Healthcare #YouthInvolvement #HealthAndWellbeing #CommunityEngagement #Networking`,
        image: '/events/african-health-summit-2026.png',
        video: '/events/african-health-summit-2026.mp4',
        category: 'Health Summit / Community Partnership',
        attendees: '',
        featured: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '10',
        title: 'Ireland Diaspora Youth Summit 2026',
        date: '2026-08-08',
        time: 'Virtual Summit',
        location: 'Online (Virtual)',
        description: `IRELAND DIASPORA YOUTH SUMMIT 2026\n\nThe National Youth Council of Nigeria (NYCN) Ireland Chapter is delighted to invite all Nigerian youths across Ireland to the Diaspora Youth Summit 2026, a unique platform designed to connect, empower, inspire, and create opportunities for our community.\n\nTheme: Building Bridges, Shaping Futures: Empowering Diaspora Youths in Ireland\n\nThis summit will bring together young leaders, professionals, entrepreneurs, students, and community stakeholders to discuss the challenges and opportunities facing Nigerian youths in Ireland.\n\nWHAT TO EXPECT:\n• Insightful panel discussions\n• Networking opportunities\n• Conversations on education, careers, entrepreneurship, and community development\n• Practical strategies for success and empowerment\n\nDISCUSSION TRACKS:\n\nTrack 1: International Students in Ireland\n• Education & Academic Success\n• Employment & Career Pathways\n• Housing & Cost of Living\n• Cultural Adaptation & Integration\n\nTrack 2: Young Entrepreneurs in Ireland\n• Access to Funding & Investment\n• Innovation & Digital Opportunities\n• Business Development & Scaling\n\nTrack 3: Refugees and Asylum Seekers in Ireland\n• Social & Economic Integration\n• Education & Skills Development\n• Employment Opportunities\n\nOne Diaspora. One Voice. Limitless Possibilities. Together, We Rise!`,
        image: '/events/diaspora-youth-summit-2026.jpeg',
        category: 'Youth Summit / Virtual Event',
        attendees: '',
        upcoming: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '9',
        title: 'Executive Leadership Training – Leadership Summit',
        date: '2026-06-18',
        time: '7:00 PM - 9:00 PM Daily',
        location: 'Online (Zoom)',
        description: `LEADERSHIP SUMMIT\nExecutive Leadership Training\nTheme: Raising Visionary Leaders for Kingdom & Societal Impact\n\nThe National Youth Council of Nigeria (NYCN), Ireland Chapter, in partnership with Global Network of Youths Fellowship, presents a 3-day Executive Leadership Training summit.\n\nSPEAKERS:\n• Dr. Ekundayo E. Olorundare — Leadership Coach & Relationship Expert\n• Pst. Moses Abiona — NLP Certified Practitioner & Life Coach\n• Mr. Jeffrey Oronsaye — Ambassador, National Youth Council of Nigeria, Ireland Chapter\n\nWHO SHOULD ATTEND:\n• Campus Leaders\n• Youth Leaders\n• Entrepreneurs\n• Professionals & Team Leaders\n• Emerging Leaders\n• Young Ministers\n\nRegistration is FREE.\n\nDon't miss this opportunity to develop your leadership skills and connect with like-minded young leaders across Ireland and beyond.`,
        image: '/events/leadership-summit-2026.jpeg',
        category: 'Training / Leadership Summit',
        attendees: '',
        upcoming: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '8',
        title: 'Executive Council Meeting – Bembela TV News Report',
        date: '2026-05-29',
        time: 'All Day',
        location: 'Dublin, Ireland',
        description: `BEMBELA TV NEWS REPORT\nDate: 29th May 2026\n\nNational Youth Council of Nigeria (NYCN) Ireland Chapter Holds Executive Council Meeting\n\nThe National Youth Council of Nigeria (NYCN) Ireland Chapter held its Executive Council (EXCO) Meeting on 29th May 2026. The meeting was presided over by the Youth Ambassador of the NYCN Ireland Chapter, Mr. Jeffrey Oronsaye.\n\nA major highlight of the meeting was the inauguration of the newly appointed executive members. During the ceremony, official letters of appointment were presented to the new appointees, formally welcoming them into their respective positions within the chapter.\n\nThe Executive Committee also adopted the Chapter's Articles of Association as the official governing document to guide its operations, administration, and activities moving forward.\n\nMembers engaged in extensive deliberations on upcoming events and discussed various modalities for their successful planning and implementation. The meeting provided an opportunity for strategic discussions aimed at advancing the objectives of the chapter and strengthening youth engagement within the Nigerian community in Ireland.\n\nIn addition, the Youth Ambassador, Mr. Jeffrey Oronsaye, delivered an insightful lecture titled "The Sacrifice for Leadership," emphasizing the values, commitment, and responsibilities required of effective leaders.\n\nThe meeting concluded on a positive note with a dinner, providing members an opportunity for networking and fellowship.\n\nReporting for Bembela TV.`,
        image: '/events/WhatsApp Image 2026-05-31 at 7.32.15 PM.jpeg',
        images: [
          '/events/WhatsApp Image 2026-05-31 at 7.32.15 PM.jpeg',
          '/events/WhatsApp Image 2026-05-31 at 7.32.47 PM.jpeg',
        ],
        video: '/events/WhatsApp Video 2026-05-31 at 6.58.21 PM.mp4',
        category: 'Executive Meeting / Leadership',
        attendees: '',
        featured: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '7',
        title: 'World Hypertension Day',
        date: '2026-05-17',
        time: 'All Day',
        location: 'Online Campaign',
        description: 'A health awareness campaign for World Hypertension Day encouraging everyone, especially young Nigerians in the diaspora, to monitor and manage high blood pressure. The campaign promotes regular blood pressure checks, physical activity and exercise, healthy eating, weight management, stress reduction, and proper sleep.',
        image: '/events/WhatsApp Image 2026-05-17 at 9.38.35 AM.jpeg',
        category: 'Health Awareness / Campaign',
        attendees: '',
        created_at: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Community Outreach',
        date: '2026-04-04',
        time: 'All Day',
        location: 'Dublin',
        description: 'A community outreach initiative by NYCN Ireland Chapter dedicated to supporting homeless and vulnerable individuals within the community.',
        image: '/events/WhatsApp Image 2026-05-07 at 8.55.05 AM.jpeg',
        category: 'Community Service / Outreach / Social Impact',
        attendees: '100+',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Webinar – Immigration Challenges in Ireland',
        date: '2026-01-31',
        time: '5:00 AM till end',
        location: 'Online Webinar (Zoom)',
        description: 'An NYCN Ireland Chapter webinar addressing immigration challenges in Ireland and helping participants understand immigration rules and legal processes.',
        image: '/events/WhatsApp Image 2026-05-07 at 9.15.15 AM.jpeg',
        category: 'Webinar / Legal Awareness / Immigration Education',
        attendees: '200+',
        created_at: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Webinar – Immigration Challenges in Ireland',
        date: '2026-01-31',
        time: '5:00 AM till end',
        location: 'Online Webinar',
        description: 'A webinar featuring Attorney Mariam Olusoji discussing immigration regulations and guidance for Nigerians living in Ireland.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=90',
        category: 'Webinar / Legal Awareness',
        attendees: '200+',
        created_at: new Date().toISOString(),
      },
      {
        id: '1',
        title: 'Youth Convention – Diaspora Integration',
        date: '2025-12-13',
        time: '3:00 PM',
        location: 'Lucan Spa Hotel, Lucan, Co. Dublin, K78 X3H, Limerick Hall',
        description: 'A youth convention focused on discussing the challenges and opportunities surrounding diaspora integration. Hosted by the National Youth Council of Nigeria (NYCN) Ireland Chapter with speakers, consultants, and entertainers.',
        image: '/events/WhatsApp Image 2026-05-07 at 9.20.21 AM.jpeg',
        category: 'Advocacy / Youth Convention / Community Engagement',
        attendees: '500+',
        created_at: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Cloud Computing Training',
        date: '2025-07-27',
        time: '5:00 PM',
        location: 'Online (Zoom)',
        description: 'A free training session introducing participants to cloud computing, key Azure services, career opportunities in Azure, and live demonstrations.',
        image: '/events/WhatsApp Image 2026-05-07 at 8.57.47 AM.jpeg',
        category: 'Training / Technology Workshop',
        attendees: '150+',
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Rise Up Nigerians in Ireland and Join the Movement',
        date: '2025-05-31',
        time: '5:00 PM',
        location: 'Dublin (Zoom)',
        description: 'A movement-driven gathering encouraging Nigerians in Ireland to participate in nation building through diaspora youth engagement.',
        image: '/events/WhatsApp Image 2026-05-07 at 8.59.35 AM.jpeg',
        category: 'Advocacy / Community Mobilization',
        attendees: '300+',
        created_at: new Date().toISOString(),
      },
    ];
  },
};
