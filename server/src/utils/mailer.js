import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST) return null;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
  return transporter;
}

/**
 * Sends mail when SMTP is configured, otherwise logs it.
 * Never throws — a mail outage must not fail a lead capture.
 */
export async function sendMail({ to, subject, html, text, replyTo }) {
  const tx = getTransporter();
  const from = process.env.MAIL_FROM || 'DostSol Global <no-reply@dostsol.com>';

  if (!tx) {
    console.log(`\n[mail:dry-run] to=${to} subject="${subject}"\n${text || html}\n`);
    return { delivered: false, reason: 'SMTP not configured' };
  }

  try {
    const info = await tx.sendMail({ from, to, subject, html, text, replyTo });
    return { delivered: true, id: info.messageId };
  } catch (err) {
    console.error(`[mail] send failed: ${err.message}`);
    return { delivered: false, reason: err.message };
  }
}

export function leadNotificationTemplate(lead) {
  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Company', lead.company],
    ['Phone', lead.phone],
    ['Service', lead.service],
    ['Team size', lead.teamSize],
    ['Budget', lead.budget],
    ['Timeline', lead.timeline],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#64748b">${k}</td><td style="padding:6px 0;font-weight:600">${v}</td></tr>`)
    .join('');

  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px">
    <h2 style="margin:0 0 4px">New enquiry — DostSol Global</h2>
    <p style="color:#64748b;margin:0 0 20px">Submitted ${new Date().toUTCString()}</p>
    <table style="border-collapse:collapse;font-size:14px">${rows}</table>
    <div style="margin-top:20px;padding:16px;background:#f5f7fb;border-radius:10px;font-size:14px;white-space:pre-wrap">${lead.message}</div>
  </div>`;
}

export function leadAutoReplyTemplate(lead) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px">
    <h2 style="margin:0 0 12px">Thanks, ${lead.name.split(' ')[0]} — we've got it.</h2>
    <p style="color:#334155;line-height:1.6">
      A DostSol Global strategist will review your requirements and reply within
      <strong>one business day</strong> with a shortlist of talent and an engagement outline.
    </p>
    <p style="color:#334155;line-height:1.6">
      Need us sooner? Call <a href="tel:+12816003570">+1 281 600 3570</a> — our desk runs 24/7.
    </p>
    <p style="color:#94a3b8;font-size:13px;margin-top:28px">
      DostSol Global · 251-L Johar Town, Lahore, Pakistan · dostsol.com
    </p>
  </div>`;
}
