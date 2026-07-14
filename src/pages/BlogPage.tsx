import { useState } from 'react';
import { Calendar, User, ArrowLeft, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const POSTS_PER_PAGE = 6;

const posts = [
  {
    id: 14,
    title: 'NYCN Ireland Summer Hangout in Galway',
    excerpt: 'Nigerian Youths in Galway, it\'s that time again! Come out, connect, have fun, and network with fellow Nigerians at our Summer Hangout in Salthill Park, Galway.',
    content: `Nigerian Youths in Galway, it's that time again!

Come out, connect, have fun, and network with fellow Nigerians at our Summer Hangout in Salthill Park, Galway. Expect good vibes, music, games, refreshments, and lots more!

DATE: Saturday, July 25th
TIME: 3:00 PM
VENUE: Salthill Park, Galway (H91 VF63)

Everyone is welcome! Send us a DM now to register your interest and don't miss out on the fun!

WHAT TO EXPECT:
• Good vibes and music
• Games and activities
• Refreshments
• Networking with fellow Nigerians
• And lots more!

This is your chance to connect with the Nigerian community in Galway, make new friends, and enjoy a wonderful summer day outdoors.

Everyone is welcome — bring your friends, family, and good energy!

#NigeriansInGalway #NYCNIreland #NigeriaYouths #SummerHangout #Galway #NigeriansInIreland #ConnectNetworkUnite`,
    author: 'NYCN Ireland',
    date: 'July 14, 2026',
    readTime: '2 min read',
    category: 'Events',
    image: '/blog/summer-hangout-galway-2026.jpeg',
  },
  {
    id: 13,
    title: 'Say NO to Domestic Violence',
    excerpt: 'Domestic violence has no place in our homes, communities, or society. Every woman, child, and vulnerable adult deserves to live in safety, dignity, and respect.',
    content: `🚫 Say NO to Domestic Violence!

Domestic violence has no place in our homes, communities, or society. Every woman, child, and vulnerable adult deserves to live in safety, dignity, and respect.

As Nigerian youths in Ireland, we stand united against all forms of abuse and violence. Together, we can raise awareness, support victims, and build a community founded on compassion, equality, and justice.

Join us in creating a safer future for everyone.

🌍 Become part of the movement: www.nycnireland.ie

#EndDomesticViolence #SayNoToAbuse #ProtectWomenAndChildren #SupportVictims #NYCNIreland #CommunitySafety #YouthForChangeCorrecte`,
    author: 'NYCN Ireland',
    date: 'June 15, 2026',
    readTime: '2 min read',
    category: 'Advocacy',
    image: '/blog/domestic-violence-2026.jpeg',
  },
  {
    id: 12,
    title: 'World No Tobacco Day 2026: Unmasking the Appeal',
    excerpt: 'NYCN Ireland joins the global fight against tobacco addiction. Learn how to counter nicotine influence and choose a healthier future.',
    content: `May 31, 2026 — World No Tobacco Day

Theme: Unmasking the Appeal — Countering Nicotine and Tobacco Addiction

The National Youth Council of Nigeria (NYCN), Ireland Chapter, joins the global community in observing World No Tobacco Day 2026. This year's campaign focuses on unmasking the deceptive appeal of tobacco and nicotine products, particularly targeting young people.

THE TRUTH ABOUT TOBACCO

Tobacco and nicotine are addictive and harmful. Despite marketing tactics and peer pressure, the reality is clear: smoking and vaping cause serious health damage, including heart disease, lung cancer, and respiratory problems.

THE KEY MESSAGES:

KNOW THE TRUTH — Tobacco and nicotine are addictive and harmful. Don't let marketing fool you.

BREAK THE ILLUSION — Don't be fooled by marketing and peer pressure. The tobacco industry spends billions to make their products look appealing, but the consequences are devastating.

CHOOSE HEALTH — A smoke-free life means a stronger, brighter future. Your health is your greatest asset.

EMPOWER YOUR GENERATION — Stand up. Speak out. Inspire change. Young people have the power to end the tobacco epidemic.

BE PART OF THE MOVEMENT

Say NO to tobacco. Say YES to life.

HEALTHY YOUTH. STRONG COMMUNITIES. BETTER TOMORROW.

NYCN Ireland Chapter is committed to promoting health awareness and empowering young Nigerians in Ireland to make informed choices about their well-being. We encourage all members and friends of our community to join the movement against tobacco.

For more information and support resources, visit www.nycnireland.ie

#NoTobacco #WorldNoTobaccoDay #NYCNIreland #HealthyYouth`,
    author: 'NYCN Ireland Health & Wellness Team',
    date: 'May 31, 2026',
    readTime: '3 min read',
    category: 'Health',
    image: '/blog/no-tobacco-day-2026.jpeg',
  },
  {
    id: 0,
    title: 'Oronsaye Inaugurates NYCN Ireland Executives As Chapter Adopts Articles Of Association',
    excerpt: 'The NYCN Ireland Chapter inaugurates newly appointed Executive Council members and adopts Articles of Association during a strategic meeting in Dublin.',
    content: `The National Youth Council of Nigeria (NYCN), Ireland Chapter, has inaugurated newly appointed members of its Executive Council (EXCO) during a strategic meeting held in Dublin on May 29, 2026.

The meeting was presided over by the Youth Ambassador of the chapter, Mr. Jeffrey Oronsaye, who reaffirmed the council's commitment to strengthening youth leadership and advancing the interests of Nigerians residing in Ireland.

During the ceremony, letters of appointment were officially presented to the appointees, marking the commencement of their responsibilities within the chapter, and were charged with upholding the ideals of the organization and contributing meaningfully to its growth and development.

In a significant move aimed at enhancing institutional governance, the Executive Council adopted the Chapter's Articles of Association as its official governing framework. The document is expected to provide clear guidelines for the administration, operations, and activities of the chapter, ensuring transparency, accountability, and effective leadership in all its engagements.

The meeting also featured extensive deliberations on a range of upcoming programmes and events designed to promote youth development, cultural integration, and community engagement, while members discussed strategies and modalities for the successful planning and implementation of these initiatives, emphasizing the importance of collaboration and active participation among Nigerian youths in Ireland.

As part of the meeting's agenda, Mr. Oronsaye delivered a thought-provoking lecture titled "The Sacrifice for Leadership" where he highlighted the values of dedication, discipline, selflessness, and commitment required for effective leadership.

The Executive Council also expressed deep concern over the recent abduction of teachers and schoolchildren in Oyo State, Nigeria. They condemned the incident and called on the Federal Government of Nigeria, as well as relevant security agencies, to intensify efforts toward securing the immediate and safe release of the victims.

The meeting concluded with a dinner session that provided an avenue for networking, fellowship, and the strengthening of relationships among members. Reaffirming its dedication to youth empowerment, leadership development, and community service, the NYCN Ireland Chapter pledged to continue implementing initiatives that positively impact Nigerians living in Ireland while fostering stronger ties with their homeland.`,
    author: 'NYCN Ireland Communications',
    date: 'May 31, 2026',
    readTime: '5 min read',
    category: 'Leadership',
    image: '/blog/exco-meeting-1.jpeg',
  },
  {
    id: 1,
    title: 'NYCN Ireland Community Gathering: Unity in Action',
    excerpt: 'Highlights from our recent community gathering showcasing the strength, unity, and vibrant spirit of the NYCN Ireland family.',
    content: `Our recent community gathering was a resounding success, bringing together members from across Ireland for a day of connection, collaboration, and celebration. The event featured inspiring speeches from our leadership team, cultural performances, networking sessions, and a shared vision for the future of our community.

We were honored to have our distinguished members and guests share their insights on youth empowerment, community development, and the importance of staying connected to our roots while embracing our Irish home.

The energy and enthusiasm displayed by everyone present reaffirms our commitment to building a stronger, more united Nigerian youth community in Ireland. Together, we are making a difference.`,
    author: 'Hon. Jeffrey Oronsaye',
    date: 'May 17, 2026',
    readTime: '4 min read',
    category: 'Community',
    image: '/blog.jpeg',
  },
  {
    id: 2,
    title: 'World Hypertension Day 2026: Know Your Numbers',
    excerpt: 'NYCN Ireland joins the global fight against hypertension. Learn about the risks, prevention strategies, and our community health awareness campaign.',
    content: `On May 17, 2026, NYCN Ireland joined the global community in observing World Hypertension Day. This year's theme, "Know Your Numbers," emphasizes the critical importance of regular blood pressure monitoring.

Hypertension, often called the "silent killer," affects millions worldwide, including a significant number of young adults in our community. Through our awareness campaign, we aim to educate our members on the risk factors, prevention strategies, and the importance of early detection.

Our Health and Wellness committee organized free blood pressure screening sessions and distributed educational materials at our community center. We encourage everyone to adopt a heart-healthy lifestyle: reduce salt intake, exercise regularly, maintain a healthy weight, and manage stress.

Your health is your wealth. Let's build a healthier community together.`,
    author: 'Health & Wellness Team',
    date: 'May 17, 2026',
    readTime: '4 min read',
    category: 'Health',
    image: '/events/WhatsApp Image 2026-05-17 at 9.38.35 AM.jpeg',
  },
  {
    id: 3,
    title: 'Building the Future: NYCN Ireland Youth Empowerment Initiatives',
    excerpt: 'Discover how the National Youth Council of Nigeria, Ireland Chapter is creating opportunities for young Nigerians through skill development, networking, and community engagement programs.',
    content: `The National Youth Council of Nigeria (NYCN) Ireland Chapter continues to make significant strides in empowering young Nigerians across the Emerald Isle. Through a series of carefully designed initiatives, we are building a community that thrives on collaboration, skill development, and mutual support.

Our programs focus on three key areas: professional development through workshops and mentorship, cultural preservation and integration, and advocacy for the rights and well-being of Nigerian youth in Ireland.

From immigration webinars to cloud computing training sessions, each initiative is tailored to address the unique challenges faced by young Nigerians in the diaspora. We believe that by equipping our members with the right tools and knowledge, we can build a stronger, more resilient community.

Join us in our mission to build the youth and build the nation. Together, we can create lasting change.`,
    author: 'Hon. Jeffrey Oronsaye',
    date: 'May 15, 2026',
    readTime: '5 min read',
    category: 'Community',
    image: '/events/WhatsApp Image 2026-05-07 at 9.20.21 AM.jpeg',
  },
  {
    id: 4,
    title: 'Leadership in the Diaspora: A Conversation with Amb. Collins Osazee Idahosa',
    excerpt: 'An exclusive interview with the newly appointed President of NYCN Diaspora on his vision for the Nigerian youth community abroad.',
    content: `In a landmark development for the Nigerian youth diaspora, Amb. Collins Osazee Idahosa has been appointed as the President of NYCN Diaspora. In this exclusive interview, he shares his vision for uniting Nigerian youth across the globe.

"Leadership is about service," Amb. Idahosa states. "Our youth abroad face unique challenges—from immigration issues to cultural integration. We must build bridges, not walls."

His priorities include establishing a diaspora mentorship program, creating a platform for youth-led businesses to connect, and advocating for policies that support young Nigerians living abroad.`,
    author: 'Editorial Team',
    date: 'May 14, 2026',
    readTime: '6 min read',
    category: 'Leadership',
    image: '/team/Amb. Collins Osazee Idahosa.jpg',
  },
  {
    id: 5,
    title: 'Cultural Exchange: Celebrating Nigerian Heritage in Ireland',
    excerpt: 'How NYCN Ireland is preserving and promoting Nigerian culture through community events, festivals, and educational programs.',
    content: `Culture is the soul of a people. At NYCN Ireland, we are committed to preserving and celebrating our rich Nigerian heritage while embracing our new home in Ireland.

From traditional dance workshops to Nigerian cuisine festivals, our cultural programs bring together Nigerians and Irish friends alike. These events foster mutual understanding, break down stereotypes, and build lasting friendships between our communities.

Our annual Nigeria Independence Day celebration remains our flagship event, drawing hundreds of attendees for a day of music, dance, food, and unity.`,
    author: 'Sarah Imaragbe',
    date: 'May 10, 2026',
    readTime: '4 min read',
    category: 'Culture',
    image: '/team/Sarah Imaragbe.jpg',
  },
  {
    id: 6,
    title: 'Career Development: Cloud Computing Training Initiative',
    excerpt: 'NYCN Ireland launches a free cloud computing training program for members. Learn AWS, Azure, and Google Cloud skills to boost your career.',
    content: `The digital economy is growing rapidly, and cloud computing skills are in high demand. Recognizing this opportunity, NYCN Ireland has launched a comprehensive cloud computing training program for its members.

The program covers Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), with hands-on labs and certification preparation. Participants will gain practical skills that are immediately applicable in the job market.

"This initiative is about economic empowerment," says our Skills Development Coordinator. "We want our members to compete in the global tech marketplace."`,
    author: 'Emmanuel Olafusi',
    date: 'May 8, 2026',
    readTime: '5 min read',
    category: 'Education',
    image: '/team/Emmanuel Olafusi.jpg',
  },
  {
    id: 7,
    title: 'Immigration Webinar: Navigating the Irish Immigration System',
    excerpt: 'A comprehensive guide to understanding visa applications, work permits, and residency requirements in Ireland.',
    content: `Understanding the immigration system is one of the biggest challenges faced by Nigerians in Ireland. To address this, NYCN Ireland organized a free webinar featuring immigration solicitors and experienced community members.

Topics covered included student visa renewals, work permit applications, family reunification, and the citizenship process. Participants had the opportunity to ask questions and receive personalized guidance.

Knowledge is power. Our goal is to ensure that no member of our community faces the immigration process alone.`,
    author: 'Sunday Anjorin',
    date: 'May 5, 2026',
    readTime: '4 min read',
    category: 'Resources',
    image: '/team/Sunday Anjorin.jpg',
  },
  {
    id: 8,
    title: 'Women in Leadership: Spotlight on Vanessa Aigbekaen',
    excerpt: 'Meet the women leaders shaping the future of NYCN Ireland and inspiring the next generation of female change-makers.',
    content: `Vanessa Aigbekaen is one of the inspiring women leaders driving positive change within NYCN Ireland. Her work in community organizing and youth mentorship has touched countless lives.

"Women bring unique perspectives to leadership," she shares. "Our ability to nurture, collaborate, and persist in the face of challenges makes us powerful agents of change."

Through mentorship circles, networking events, and advocacy programs, NYCN Ireland is committed to empowering women and girls in our community.`,
    author: 'Vanessa Aigbekaen',
    date: 'May 3, 2026',
    readTime: '5 min read',
    category: 'Leadership',
    image: '/team/Vanessa Aigbekaen.jpg',
  },
  {
    id: 9,
    title: 'NYCN Ireland Partners with Local Irish Organizations',
    excerpt: 'New partnerships with Irish community organizations open doors for collaboration, resources, and shared impact.',
    content: `NYCN Ireland is proud to announce new partnerships with several Irish community organizations. These collaborations will enhance our ability to serve our members and contribute to Irish society.

Partnerships include joint events, resource sharing, and collaborative advocacy on issues affecting migrants and young people. By working together with Irish organizations, we build bridges and create more inclusive communities.

We believe that integration is a two-way street. Our members contribute their talents, perspectives, and energy to Ireland, while Ireland offers opportunities for growth and belonging.`,
    author: 'Martins Idemudia',
    date: 'April 28, 2026',
    readTime: '3 min read',
    category: 'Community',
    image: '/team/Martins Idemudia.jpg',
  },
  {
    id: 10,
    title: 'Youth Entrepreneurship: Turning Ideas into Businesses',
    excerpt: 'Success stories from NYCN Ireland members who have launched startups and built successful businesses in Ireland.',
    content: `Entrepreneurship is thriving within the NYCN Ireland community. From tech startups to catering businesses, our members are turning their passions into thriving enterprises.

In this feature, we profile three NYCN Ireland members who have successfully launched businesses in Ireland. Their journeys—from idea to execution—offer valuable lessons for aspiring entrepreneurs.

Key takeaways: start small, leverage community networks, seek mentorship, and never give up. The entrepreneurial spirit is alive and well in our community.`,
    author: 'Abisola Adegoke',
    date: 'April 25, 2026',
    readTime: '6 min read',
    category: 'Business',
    image: '/team/Abisola Adegoke.jpeg',
  },
  {
    id: 11,
    title: 'Mental Health Awareness: Breaking the Stigma',
    excerpt: 'NYCN Ireland launches a mental health awareness campaign to support members facing stress, anxiety, and depression.',
    content: `Mental health is an essential part of our overall well-being. Yet in many communities, including ours, discussing mental health challenges remains taboo. NYCN Ireland is working to change that.

Our mental health awareness campaign includes confidential support groups, access to professional counseling resources, and educational workshops on stress management and self-care.

"You are not alone" is our message. We encourage everyone to prioritize their mental health and reach out for support when needed. Together, we can break the stigma and build a healthier community.`,
    author: 'Sharon Alozie',
    date: 'April 20, 2026',
    readTime: '4 min read',
    category: 'Health',
    image: '/team/Sharon Alozie.jpeg',
  },
];

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const toggleExpand = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-hero-gradient text-primary-foreground py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our Blog
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Stories, updates, and insights from the NYCN Ireland community.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {currentPosts.map((post) => (
            <article key={post.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              {post.image && (
                <div className={`relative overflow-hidden flex-shrink-0 ${expandedPost === post.id ? '' : 'h-48'}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={`w-full transition-all duration-300 ${expandedPost === post.id ? 'object-contain max-h-[500px]' : 'h-48 object-cover'}`}
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-background/60 to-transparent ${expandedPost === post.id ? 'hidden' : ''}`} />
                  <div className={`absolute bottom-3 left-3 ${expandedPost === post.id ? 'hidden' : ''}`}>
                    <span className="inline-block px-3 py-1 bg-gold-gradient text-foreground rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>

                <h2 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {expandedPost === post.id && (
                  <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line mb-4 border-t border-border pt-4">
                    {post.content}
                    {post.gallery && post.gallery.length > 0 && (
                      <div className="mt-6 space-y-3">
                        {post.gallery.map((img: string, idx: number) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${post.title} - Photo ${idx + 1}`}
                            className="w-full rounded-lg border border-border"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => toggleExpand(post.id)}
                  className="mt-auto text-gold hover:text-gold/80 font-medium text-sm transition-colors self-start"
                >
                  {expandedPost === post.id ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-gold-gradient text-foreground'
                    : 'border border-border hover:bg-accent'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;
