import { sendEmail } from '../_lib/mail.js';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

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

    const { fullName, whatsapp, email, county } = parsed || {};
    if (!fullName || !whatsapp || !email || !county) {
      return respond(400, { error: 'All fields are required' });
    }

    const userHtml = `<div style="font-family:Arial;max-width:600px;margin:auto;padding:20px;background:#f9f9f9">
      <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:30px;border-radius:10px 10px 0 0;text-align:center">
        <h1 style="color:#d4a843;margin:0">Welcome to Nigeria Youths in Ireland!</h1>
      </div>
      <div style="background:white;padding:30px;border-radius:0 0 10px 10px">
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>Thank you for registering. We'll be in touch via <strong>${whatsapp}</strong> soon.</p>
        <div style="text-align:center;margin:30px 0">
          <a href="https://nycnireland.ie" style="display:inline-block;background:#d4a843;color:#1a1a2e;padding:14px 40px;border-radius:5px;text-decoration:none;font-weight:bold;font-size:16px;line-height:1.5;border:1px solid #d4a843">Visit Our Website</a>
        </div>
        <p>Yours in service,<br><strong>Nigeria Youths in Ireland Team</strong></p>
      </div>
    </div>`;
    const adminHtml = `<div style="font-family:Arial;max-width:600px;margin:auto;padding:20px;background:#f9f9f9">
      <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:30px;border-radius:10px 10px 0 0;text-align:center">
        <h1 style="color:#d4a843;margin:0">New Member Registration</h1>
      </div>
      <div style="background:white;padding:30px;border-radius:0 0 10px 10px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${fullName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #eee">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">WhatsApp</td><td style="padding:8px;border-bottom:1px solid #eee">${whatsapp}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">County</td><td style="padding:8px">${county}</td></tr>
        </table>
      </div>
    </div>`;

    await Promise.allSettled([
      sendEmail({ to: email, subject: 'Welcome to Nigeria Youths in Ireland!', html: userHtml }),
      sendEmail({ to: 'info@nycnireland.ie', subject: `New Member: ${fullName}`, html: adminHtml }),
    ]);

    respond(201, { success: true, message: 'Registration successful!' });

    function respond(code: number, data: any) {
      if (!res.headersSent) res.status(code).json(data);
    }
  }
}
