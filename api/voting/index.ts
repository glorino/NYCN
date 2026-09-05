import { sendEmail } from '../_lib/mail.js';

// In-memory storage for nominations (resets on cold start)
// For production, use Vercel KV or a database
let nominations: Record<number, { name: string; count: number; voters: string[] }> = {};

// Initialize with empty categories
for (let i = 1; i <= 10; i++) {
  nominations[i] = { name: '', count: 0, voters: [] };
}

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

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET - Fetch all nominations
  if (req.method === 'GET') {
    const results = Object.entries(nominations).map(([id, data]) => ({
      categoryId: parseInt(id),
      categoryName: categoryNames[parseInt(id)],
      nomineeName: data.name,
      voteCount: data.count,
    }));
    return res.status(200).json(results);
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

      const { nominations: submittedNominations, voterName } = parsed || {};
      
      if (!submittedNominations || !Array.isArray(submittedNominations) || submittedNominations.length === 0) {
        return respond(400, { error: 'At least one nomination is required' });
      }

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

      // Send confirmation email
      if (voterName) {
        const emailHtml = `<div style="font-family:Arial;max-width:600px;margin:auto;padding:20px;background:#f9f9f9">
          <div style="background:linear-gradient(135deg,#16a34a,#15803d);padding:30px;border-radius:10px 10px 0 0;text-align:center">
            <h1 style="color:white;margin:0">🏆 NYCN Ireland Youth Festival</h1>
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

      function respond(code: number, data: any) {
        if (!res.headersSent) res.status(code).json(data);
      }
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
