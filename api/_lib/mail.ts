import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'info@nycnireland.ie',
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.SMTP_PASS) {
    console.warn('SMTP_PASS not set — skipping email');
    return;
  }
  try {
    const info = await transporter.sendMail({
      from: `"Nigeria Youths in Ireland" <info@nycnireland.ie>`,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}:`, info.messageId);
  } catch (err: any) {
    console.error(`Failed to send email to ${to}:`, err?.message || err);
  }
}
