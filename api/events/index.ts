// Vercel serverless function for events API with simple in-memory storage
// Removed KV dependency to prevent 500 errors

// In-memory storage (will reset on each deployment, but works reliably)
let events: any[] = [
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
    image: '/events/WhatsApp Image 2026-05-07 at 9.15.15 AM.jpeg',
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

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log('API Request:', req.method, req.url);
  console.log('Headers:', req.headers);
  console.log('Body type:', typeof req.body);
  console.log('Raw body:', req.body);

  try {
    if (req.method === 'GET') {
      console.log('GET events - returning', events.length, 'events');
      res.status(200).json(events);
    } 
    else if (req.method === 'POST') {
      console.log('POST - creating event');
      
      let eventData;
      
      // Try different ways to parse the body
      if (typeof req.body === 'string') {
        try {
          eventData = JSON.parse(req.body);
        } catch (e) {
          console.error('Failed to parse string body:', e);
          res.status(400).json({ error: 'Invalid JSON in request body' });
          return;
        }
      } else if (typeof req.body === 'object') {
        eventData = req.body;
      } else {
        console.error('Invalid body type:', typeof req.body);
        res.status(400).json({ error: 'Invalid request body format' });
        return;
      }
      
      console.log('Parsed event data:', eventData);
      
      const newEvent = {
        ...eventData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      
      events.push(newEvent);
      console.log('Event created successfully:', newEvent);
      console.log('Total events now:', events.length);
      res.status(201).json(newEvent);
    }
    else if (req.method === 'PUT') {
      console.log('PUT - updating event');
      
      let eventData;
      if (typeof req.body === 'string') {
        try {
          eventData = JSON.parse(req.body);
        } catch (e) {
          res.status(400).json({ error: 'Invalid JSON in request body' });
          return;
        }
      } else if (typeof req.body === 'object') {
        eventData = req.body;
      } else {
        res.status(400).json({ error: 'Invalid request body format' });
        return;
      }
      
      const { id, ...updateData } = eventData;
      const index = events.findIndex((event: any) => event.id === id);
      
      if (index === -1) {
        console.log('Event not found:', id);
        res.status(404).json({ error: 'Event not found' });
        return;
      }
      
      events[index] = { ...events[index], ...updateData };
      console.log('Event updated successfully:', events[index]);
      res.status(200).json(events[index]);
    }
    else if (req.method === 'DELETE') {
      console.log('DELETE - removing event');
      
      let eventData;
      if (typeof req.body === 'string') {
        try {
          eventData = JSON.parse(req.body);
        } catch (e) {
          res.status(400).json({ error: 'Invalid JSON in request body' });
          return;
        }
      } else if (typeof req.body === 'object') {
        eventData = req.body;
      } else {
        res.status(400).json({ error: 'Invalid request body format' });
        return;
      }
      
      const { id } = eventData;
      const index = events.findIndex((event: any) => event.id === id);
      
      if (index === -1) {
        console.log('Event not found for deletion:', id);
        res.status(404).json({ error: 'Event not found' });
        return;
      }
      
      events.splice(index, 1);
      console.log('Event deleted successfully, total events now:', events.length);
      res.status(200).json({ message: 'Event deleted successfully' });
    }
    else {
      console.log('Method not allowed:', req.method);
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' });
  }
};
