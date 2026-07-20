import { sendEmail } from '../_lib/mail.js';

// In-memory store (resets on redeploy, but reliable)
const registrations: any[] = [];

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body;
  try { if (req.body !== undefined) body = req.body; } catch {}
  if (body === undefined) {
    const d = Object.getOwnPropertyDescriptor(req, 'body');
    if (d && !d.get && d.value !== undefined) body = d.value;
  }
  if (body === undefined) {
    const chunks: any[] = [];
    req.on('data', (c: any) => chunks.push(c));
    req.on('end', () => processBody(Buffer.concat(chunks).toString('utf8')));
    req.on('error', () => res.status(500).json({ error: 'Request error' }));
    return;
  }
  return processBody(body);

  async function processBody(raw: any) {
    let data: any;
    try {
      if (typeof raw === 'string') data = JSON.parse(raw.replace(/^\uFEFF/, ''));
      else if (raw && typeof raw === 'object') data = raw;
      else return respond(400, { error: 'Invalid body' });
    } catch {
      return respond(400, { error: 'Invalid JSON body' });
    }

    const { firstName, email, phone, expectations, eventId, eventTitle } = data || {};

    if (!firstName || !email || !phone || !eventId) {
      return respond(400, { error: 'First name, email, phone and event are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return respond(400, { error: 'Please provide a valid email address' });
    }

    const registration = {
      id: Date.now().toString(),
      firstName,
      email,
      phone,
      expectations: expectations || '',
      eventId,
      eventTitle: eventTitle || '',
      created_at: new Date().toISOString(),
    };

    registrations.push(registration);

    const userHtml = `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#f5f5f7">
      <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:36px 30px;border-radius:12px 12px 0 0;text-align:center">
        <h1 style="color:#d4a843;margin:0;font-size:24px;letter-spacing:0.5px">Registration Confirmed</h1>
        <p style="color:#ffffff;opacity:0.85;margin:8px 0 0;font-size:14px">National Youth Council of Nigeria — Ireland Chapter</p>
      </div>
      <div style="background:#ffffff;padding:36px 30px;border-radius:0 0 12px 12px">
        <p style="font-size:16px;color:#1a1a2e;margin:0 0 16px">Dear <strong>${firstName}</strong>,</p>
        <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 16px">
          Thank you for registering for <strong>${eventTitle || 'the NYCN Ireland event'}</strong>.
          We are delighted to confirm your place and look forward to welcoming you.
        </p>
        <div style="background:#fbf6e9;border-left:4px solid #d4a843;padding:16px 18px;border-radius:6px;margin:0 0 20px">
          <p style="margin:0;font-size:14px;color:#5a4a1a;line-height:1.6">
            <strong>Certificate of Participation:</strong> A Certificate of Participation will be presented to all
            registered attendees who take part in this event.
          </p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin:0 0 24px;font-size:14px">
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;width:40%">Event</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a2e;font-weight:600">${eventTitle || 'NYCN Ireland Event'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a2e">${email}</td></tr>
          <tr><td style="padding:10px 0;color:#888">Phone</td><td style="padding:10px 0;color:#1a1a2e">${phone}</td></tr>
        </table>
        <div style="text-align:center;margin:30px 0">
          <a href="https://nycnireland.ie" style="display:inline-block;background:#d4a843;color:#1a1a2e;padding:14px 40px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px">Visit Our Website</a>
        </div>
        <p style="font-size:14px;color:#666;line-height:1.6;margin:0">
          If you have any questions, simply reply to this email or contact us at
          <a href="mailto:info@nycnireland.ie" style="color:#d4a843;text-decoration:none">info@nycnireland.ie</a>.
        </p>
        <p style="font-size:14px;color:#1a1a2e;margin:24px 0 0">
          Warm regards,<br><strong>NYCN Ireland Events Team</strong>
        </p>
      </div>
      <p style="text-align:center;color:#999;font-size:12px;margin:16px 0 0">
        © ${new Date().getFullYear()} National Youth Council of Nigeria, Ireland Chapter. All rights reserved.
      </p>
    </div>`;

    const adminHtml = `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#f5f5f7">
      <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:30px;border-radius:12px 12px 0 0;text-align:center">
        <h1 style="color:#d4a843;margin:0;font-size:22px">New Event Registration</h1>
      </div>
      <div style="background:#ffffff;padding:30px;border-radius:0 0 12px 12px">
        <p style="font-size:14px;color:#666;margin:0 0 20px">A new registration has been received for <strong>${eventTitle || eventId}</strong>.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#1a1a2e;background:#fafafa;width:35%">Event</td><td style="padding:10px;border-bottom:1px solid #eee;color:#333">${eventTitle || eventId}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#1a1a2e;background:#fafafa">First Name</td><td style="padding:10px;border-bottom:1px solid #eee;color:#333">${firstName}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#1a1a2e;background:#fafafa">Email</td><td style="padding:10px;border-bottom:1px solid #eee;color:#333">${email}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#1a1a2e;background:#fafafa">Phone</td><td style="padding:10px;border-bottom:1px solid #eee;color:#333">${phone}</td></tr>
          <tr><td style="padding:10px;font-weight:bold;color:#1a1a2e;background:#fafafa;vertical-align:top">Expectations</td><td style="padding:10px;color:#333">${expectations || '—'}</td></tr>
        </table>
        <p style="font-size:12px;color:#999;margin:20px 0 0">Submitted on ${new Date().toLocaleString()}</p>
      </div>
    </div>`;

    await Promise.allSettled([
      sendEmail({ to: email, subject: `Registration Confirmed — ${eventTitle || 'NYCN Ireland Event'}`, html: userHtml }),
      sendEmail({ to: 'info@nycnireland.ie', subject: `New Registration: ${firstName} — ${eventTitle || eventId}`, html: adminHtml }),
    ]);

    return respond(201, { success: true, message: 'Registration successful', id: registration.id });

    function respond(code: number, data: any) {
      if (!res.headersSent) res.status(code).json(data);
    }
  }
}
