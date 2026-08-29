// Knowledge base for Nigeria Youths in Ireland Chatbot

export interface KnowledgeEntry {
  keywords: string[];
  response: string;
  category: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ['join', 'member', 'membership', 'become a member', 'how to join', 'sign up', 'register'],
    category: 'membership',
    response: `To join Nigeria Youths in Ireland, you have several options:

1. **Fill out our Join Us form** - Click the "Join Us" button in the header
2. **Contact us directly:**
   📧 Email: info@nycn.ie
   📞 Phone: +353 83 487 0106
3. **Visit our website** - Fill out the contact form

We'd love to have you as part of our community! Once you join, you'll have access to:
• Networking events
• Professional development workshops
• Cultural activities
• Mentorship opportunities
• Community support`
  },
  {
    keywords: ['event', 'events', 'upcoming', 'next event', 'when', 'schedule', 'calendar'],
    category: 'events',
    response: `Our next major event is:

🎉 **Youth Convention - Diaspora Integration**
📅 Date: December 13, 2025
📍 Location: Lucan Spa Hotel, Dublin, Ireland
🔗 Register: https://tinyurl.com/NYCN2025

Other upcoming events:
• NYCN Moving Forward - August 23, 2025 (Madrid, Spain)
• Cloud Computing Training - July 19, 2025 (Dublin, Zoom)
• Rise Up Nigerians in Ireland - May 31, 2025 (Dublin, Zoom)

Check our Events page for full details and registration!`
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'address', 'location', 'where'],
    category: 'contact',
    response: `You can reach Nigeria Youths in Ireland at:

📧 **Email:** info@nycn.ie
📞 **Phone:** +353 83 487 0106
📍 **Location:** Dublin, Ireland

**Response Time:** We typically respond within 24-48 hours

You can also:
• Fill out our contact form on the website
• Visit our Events page to meet us in person
• Follow us on social media for updates`
  },
  {
    keywords: ['about', 'what is', 'who are', 'organization', 'nycn'],
    category: 'about',
    response: `Nigeria Youths in Ireland (RN:794640) is the **National Youth Council of Nigeria, Ireland Chapter**.

We serve as the cornerstone for Nigerian youth in Ireland, helping them navigate the challenges of living abroad while staying connected to their roots.

**What we do:**
• Personal development programs
• Academic growth support
• Professional networking
• Cultural preservation
• Community building

**Our slogan:** BUILD THE YOUTH BUILD THE NATION

We've been empowering Nigerian youth in Ireland since 1964!`
  },
  {
    keywords: ['mission', 'purpose', 'goal'],
    category: 'mission',
    response: `Our mission is to create a supportive environment for Nigerian youth in Ireland by providing:

✅ Resources and support
✅ Mentorship opportunities
✅ Professional networking
✅ Educational programs

We empower them to contribute positively to both Irish and Nigerian communities while maintaining pride in their Nigerian heritage.`
  },
  {
    keywords: ['vision', 'future', 'aspiration'],
    category: 'vision',
    response: `Our vision is to build a vibrant Nigerian community in Ireland where youth:

🌟 Thrive academically
🌟 Excel professionally
🌟 Flourish socially
🌟 Maintain pride in their Nigerian heritage

We envision a community where every Nigerian youth in Ireland has the support and opportunities they need to succeed!`
  },
  {
    keywords: ['team', 'leadership', 'officers', 'executive', 'board', 'who leads'],
    category: 'team',
    response: `Our leadership team includes:

👔 **Amb. Collins Osazee Idahosa** - Governor, NYCN Europe Chapter
👔 **Hon. Jeffrey Oronsaye** - Chairman, Nigeria Youths in Ireland Chapter
👔 **Felicia Akinbulejo** - Deputy Chairman
👔 **Andrew Edeki** - Organising Secretary
👔 **Goodness Chiamaka Ezeogu** - Assistant Organising Secretary
👔 **Emmanuel Femi Olafusi** - Asst. Organising Secretary
👔 **Martins Idemudia** - Public Relations Officer
👔 **Sunday Anjorin** - Financial Secretary
👔 **Sarah Imariagbe** - Treasurer

Visit our Team page to learn more about each leader!`
  },
  {
    keywords: ['social', 'social media', 'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube', 'follow'],
    category: 'social',
    response: `Follow us on social media to stay connected! 📱

🔵 **Facebook:** National Youth Council of Nigeria Nigeria Youths in Ireland chapter
🔗 **LinkedIn:** National Youth Council of Nigeria Ireland Chapter
🎵 **TikTok:** @nycnireland

We post:
• Event updates and announcements
• Community news
• Success stories
• Educational content
• Cultural celebrations

Don't forget to follow us for the latest updates! 🎉`
  },
  {
    keywords: ['values', 'principles', 'what we believe'],
    category: 'values',
    response: `Our core values are:

❤️ **Community** - Building strong connections
🎓 **Education** - Supporting academic growth
🤝 **Unity** - Working together for common goals

These values guide everything we do at Nigeria Youths in Ireland.`
  },
  {
    keywords: ['advocacy', 'advocate', 'support', 'help'],
    category: 'advocacy',
    response: `We advocate for:

✅ Meaningful change in the community
✅ Addressing discrimination
✅ Promoting contributions of Nigerian youth
✅ Supporting youth rights and opportunities

If you need advocacy support or have concerns, please contact us at info@nycn.ie`
  },
  {
    keywords: ['statistics', 'stats', 'numbers', 'how many', 'members', 'events', 'years'],
    category: 'stats',
    response: `Nigeria Youths in Ireland by the numbers:

👥 **5k+ Members** - Growing community
📅 **100+ Events** - Past and upcoming
📆 **Since 1964** - Decades of service

We're proud of our growing community and the impact we've made!`
  },
  {
    keywords: ['county', 'counties', 'where', 'locations', 'regions'],
    category: 'location',
    response: `Nigeria Youths in Ireland serves Nigerian youth across all 32 counties of Ireland:

• Dublin (main office)
• Cork, Galway, Limerick
• And all other Irish counties!

No matter where you are in Ireland, you're welcome to join our community. When you register, you can select your county!`
  },
  {
    keywords: ['registration', 'register', 'event registration', 'sign up for event'],
    category: 'registration',
    response: `To register for events:

1. **Visit our Events page** - See all upcoming events
2. **Click "Register Now"** or "Learn More" on any event
3. **Fill out the registration form**
4. **For the Youth Convention** - Use: https://tinyurl.com/NYCN2025

You can also contact us at info@nycn.ie for event registration assistance!`
  },
  {
    keywords: ['help', 'support', 'assistance', 'need help'],
    category: 'help',
    response: `I'm here to help! I can answer questions about:

• Membership and joining
• Upcoming events
• Contact information
• Our mission and vision
• Team and leadership
• Social media links

For specific inquiries, contact us:
📧 info@nycn.ie
📞 +353 83 487 0106

What would you like to know?`
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    category: 'greeting',
    response: `Hello! 👋 Welcome to Nigeria Youths in Ireland!

I'm here to help you learn about our organization, events, and how to join our community. 

You can ask me about:
• How to join NYCN
• Upcoming events
• Contact information
• Our mission and values
• Team members
• Social media links

How can I assist you today?`
  }
];

// Helper function to find best matching response
export const findResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for exact matches first
  for (const entry of knowledgeBase) {
    for (const keyword of entry.keywords) {
      if (lowerMessage === keyword || lowerMessage.includes(keyword)) {
        return entry.response;
      }
    }
  }
  
  // Check for partial matches with higher priority
  const matches: { entry: KnowledgeEntry; score: number }[] = [];
  
  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lowerMessage.includes(keyword)) {
        score += keyword.length; // Longer keywords get higher score
      }
    }
    if (score > 0) {
      matches.push({ entry, score });
    }
  }
  
  // Return the highest scoring match
  if (matches.length > 0) {
    matches.sort((a, b) => b.score - a.score);
    return matches[0].entry.response;
  }
  
  // Default fallback response
  return `Thank you for your message! I can help you with information about:

• **Membership** - How to join Nigeria Youths in Ireland
• **Events** - Upcoming events and registration
• **Contact** - Email, phone, and location
• **About Us** - Our mission, vision, and values
• **Team** - Meet our leadership
• **Social Media** - Follow us online

For specific inquiries, please contact us at info@nycn.ie or call +353 83 487 0106.

What would you like to know?`;
};

