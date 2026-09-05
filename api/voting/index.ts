import { sendEmail } from '../_lib/mail.js';

// Try to use Vercel KV if configured, otherwise use in-memory storage
let kvAvailable = false;
let kv: any = null;

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const kvModule = await import('@vercel/kv');
    kv = kvModule.kv;
    kvAvailable = true;
    console.log('Vercel KV is available');
  } else {
    console.log('Vercel KV not configured, using in-memory storage');
  }
} catch (error) {
  console.log('Vercel KV import failed, using in-memory storage');
}

const KV_KEY = 'nycn:nominations';
const VOTERS_KEY = 'nycn:voters';

const categoryNames: Record<number, string> = {
  1: 'Youth Leader of the Year Award',
  2: 'Most Outstanding Youth Volunteer Award',
  3: 'Community Impact Award',
  4: 'Academic Excellence Award',
  5: 'Creative Talent Award',
  6: 'Young Entrepreneur of the Year Award',
  7: 'Cultural Ambassador Award',
  8: 'Humanitarian & Service Award',
  9: 'Entertainer of the Year Award',
  10: 'Most Active Member of NYCN Ireland Award',
};

interface NominationData {
  name: string;
  count: number;
  voters: string[];
}

interface VoterRecord {
  ip: string;
  fingerprint: string;
  timestamp: number;
}

// In-memory fallback storage
let memoryStore: Record<number, NominationData> = {};
for (let i = 1; i <= 10; i++) {
  memoryStore[i] = { name: '', count: 0, voters: [] };
}
let memoryVoters: VoterRecord[] = [];

async function getNominations(): Promise<Record<number, NominationData>> {
  if (kvAvailable && kv) {
    try {
      const data = await kv.get(KV_KEY);
      if (data) return data;
    } catch (error) {
      console.error('Error reading nominations from KV:', error);
    }
  }
  return memoryStore;
}

async function saveNominations(nominations: Record<number, NominationData>): Promise<void> {
  if (kvAvailable && kv) {
    try {
      await kv.set(KV_KEY, nominations);
      console.log('Saved nominations to Vercel KV');
      return;
    } catch (error) {
      console.error('Error saving nominations to KV:', error);
    }
  }
  memoryStore = nominations;
  console.log('Saved nominations to in-memory storage');
}

async function getVoters(): Promise<VoterRecord[]> {
  if (kvAvailable && kv) {
    try {
      const data = await kv.get(VOTERS_KEY);
      if (data) return data;
    } catch (error) {
      console.error('Error reading voters from KV:', error);
    }
  }
  return memoryVoters;
}

async function saveVoters(voters: VoterRecord[]): Promise<void> {
  if (kvAvailable && kv) {
    try {
      await kv.set(VOTERS_KEY, voters);
      console.log('Saved voters to Vercel KV');
      return;
    } catch (error) {
      console.error('Error saving voters to KV:', error);
    }
  }
  memoryVoters = voters;
  console.log('Saved voters to in-memory storage');
}

function getClientIp(req: any): string {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
         req.headers['x-real-ip'] || 
         req.socket?.remoteAddress || 
         'unknown';
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    if (name) cookies[name.trim()] = rest.join('=').trim();
  });
  return cookies;
}

function generateCookie(fingerprint: string): string {
  return `nycn_voted=${fingerprint}; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Lax; HttpOnly`;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET - Fetch all nominations
  if (req.method === 'GET') {
    try {
      const nominations = await getNominations();
      const results = Object.entries(nominations).map(([id, data]) => ({
        categoryId: parseInt(id),
        categoryName: categoryNames[parseInt(id)],
        nomineeName: data.name,
        voteCount: data.count,
      }));
      return res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching nominations:', error);
      return res.status(500).json({ error: 'Failed to fetch nominations' });
    }
  }

  // DELETE - Reset all nominations (admin only)
  if (req.method === 'DELETE') {
    try {
      const emptyNominations: Record<number, NominationData> = {};
      for (let i = 1; i <= 10; i++) {
        emptyNominations[i] = { name: '', count: 0, voters: [] };
      }
      await saveNominations(emptyNominations);
      await saveVoters([]);
      return res.status(200).json({ success: true, message: 'All nominations cleared' });
    } catch (error) {
      console.error('Error clearing nominations:', error);
      return res.status(500).json({ error: 'Failed to clear nominations' });
    }
  }

  // POST - Submit nominations
  if (req.method === 'POST') {
    let body;
    try { if (req.body !== undefined) body = req.body; } catch {}
    if (body === undefined) {
      const d = Object.getOwnPropertyDescriptor(req, 'body');
      if (d && !d.get && d.value !== undefined) body = d.value;
    }

    if (body === undefined) {
      const chunks: any[] = [];
      req.on('data', (c: any) => chunks.push(c));
      req.on('end', () => processBody(Buffer.concat(chunks).toString('utf8'), true));
      req.on('error', () => res.status(500).json({ error: 'Request error' }));
      return;
    }

    return processBody(body, false);

    async function processBody(raw: any, fromStream: boolean) {
      let parsed: any;
      try {
        if (typeof raw === 'string') {
          parsed = JSON.parse(raw.replace(/^\uFEFF/, ''));
        } else if (raw && typeof raw === 'object') {
          parsed = raw;
        } else {
          return respond(400, { error: 'Invalid body' });
        }
      } catch {
        return respond(400, { error: 'Invalid JSON body' });
      }

      const { nominations: submittedNominations, voterName, fingerprint } = parsed || {};
      
      if (!submittedNominations || !Array.isArray(submittedNominations) || submittedNominations.length === 0) {
        return respond(400, { error: 'At least one nomination is required' });
      }

      // Get client IP and fingerprint
      const clientIp = getClientIp(req);
      const voterFingerprint = fingerprint || '';
      
      try {
        // Check for duplicate vote
        const voters = await getVoters();
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000; // 24 hours cooldown
        
        // Check if this IP or fingerprint has voted (permanent block)
        const existingVoter = voters.find(v => {
          return v.ip === clientIp || (voterFingerprint && v.fingerprint === voterFingerprint);
        });

        if (existingVoter) {
          return respond(409, { 
            error: 'You have already submitted a nomination. Each person can only vote once.',
            alreadyVoted: true
          });
        }

        // Get current nominations
        const nominations = await getNominations();

        // Process each nomination
        for (const nomination of submittedNominations) {
          const { categoryId, nomineeName } = nomination;
          if (categoryId && nomineeName && nomineeName.trim()) {
            if (!nominations[categoryId]) {
              nominations[categoryId] = { name: '', count: 0, voters: [] };
            }
            // Check if this nominee name already exists for this category
            if (nominations[categoryId].name === nomineeName.trim()) {
              nominations[categoryId].count++;
            } else if (nominations[categoryId].count === 0) {
              // First nomination for this category
              nominations[categoryId].name = nomineeName.trim();
              nominations[categoryId].count = 1;
            } else {
              // Different nominee - increment count for existing
              nominations[categoryId].count++;
            }
            if (voterName) {
              nominations[categoryId].voters.push(voterName);
            }
          }
        }

        // Save updated nominations
        await saveNominations(nominations);

        // Record this voter
        const newVoter: VoterRecord = {
          ip: clientIp,
          fingerprint: voterFingerprint,
          timestamp: now,
        };
        voters.push(newVoter);
        
        // Cleanup old records (older than 34 days)
        const thirtyFourDays = 34 * 24 * 60 * 60 * 1000;
        const cleanedVoters = voters.filter(v => (now - v.timestamp) < thirtyFourDays);
        await saveVoters(cleanedVoters);

        // Set cookie to prevent duplicate voting
        const cookieValue = voterFingerprint || `${clientIp}-${now}`;
        const cookie = generateCookie(cookieValue);
        res.setHeader('Set-Cookie', cookie);

        // Send confirmation email
        if (voterName) {
          const emailHtml = `<div style="font-family:Arial;max-width:600px;margin:auto;padding:20px;background:#f9f9f9">
            <div style="background:linear-gradient(135deg,#16a34a,#15803d);padding:30px;border-radius:10px 10px 0 0;text-align:center">
              <h1 style="color:white;margin:0">🏆 NYCN Ireland Youth Festival 2026</h1>
              <p style="color:#bbf7d0;margin:10px 0 0">Award Nominations</p>
            </div>
            <div style="background:white;padding:30px;border-radius:0 0 10px 10px">
              <p>Dear <strong>${voterName}</strong>,</p>
              <p>Thank you for your nominations! Your voice matters in celebrating Nigerian youth excellence in Ireland.</p>
              <p style="margin-top:20px"><strong>Your nominations:</strong></p>
              <ul style="padding-left:20px">
                ${submittedNominations.map((n: any) => `<li>${categoryNames[n.categoryId]}: <strong>${n.nomineeName}</strong></li>`).join('')}
              </ul>
              <div style="text-align:center;margin:30px 0">
                <a href="https://nycnie.vercel.app/voting" style="display:inline-block;background:#16a34a;color:white;padding:14px 40px;border-radius:5px;text-decoration:none;font-weight:bold">View Nominations</a>
              </div>
              <p>Yours in service,<br><strong>Nigeria Youths in Ireland Team</strong></p>
            </div>
          </div>`;

          await sendEmail({ 
            to: 'info@nycnireland.ie', 
            subject: `New Nominations from ${voterName}`, 
            html: emailHtml 
          }).catch(console.error);
        }

        respond(201, { success: true, message: 'Nominations submitted successfully!' });
      } catch (error) {
        console.error('Error processing nominations:', error);
        respond(500, { error: 'Failed to save nominations' });
      }

      function respond(code: number, data: any) {
        if (!res.headersSent) res.status(code).json(data);
      }
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
