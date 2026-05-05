"use server";
import nodemailer from "nodemailer";

const { SMTP_USER, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT ? parseInt(SMTP_PORT) : 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* ── Email sent TO Sonu (notification) ── */
const buildNotificationHtml = ({ name, email, subject, message }: ContactFormData) => `
<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8" /><title>New Message</title></head>
  <body style="font-family:'Courier New',monospace;background:#0E0E0E;margin:0;padding:40px 0;">
    <table width="100%" cellspacing="0" cellpadding="0"
      style="max-width:560px;margin:0 auto;background:#111;border:1px solid #222;">

      <!-- header -->
      <tr>
        <td style="padding:24px 32px;border-bottom:1px solid #1a1a1a;">
          <span style="font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#C9F23D;">
            PORTFOLIO · NEW MESSAGE
          </span>
        </td>
      </tr>

      <!-- body -->
      <tr>
        <td style="padding:32px;">
          <p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#555;margin:0 0 24px;">
            Incoming contact
          </p>

          ${[
            ["From",    name],
            ["Email",   email],
            ["Subject", subject],
          ].map(([label, value]) => `
            <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #1a1a1a;">
              <p style="font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:#555;margin:0 0 6px;">${label}</p>
              <p style="font-size:14px;color:#e5e5e5;margin:0;">${value}</p>
            </div>
          `).join("")}

          <div style="margin-bottom:0;padding:20px;background:#0E0E0E;border-left:2px solid #C9F23D;">
            <p style="font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:#555;margin:0 0 10px;">Message</p>
            <p style="font-size:14px;color:#ccc;margin:0;line-height:1.7;">${message}</p>
          </div>
        </td>
      </tr>

      <!-- footer -->
      <tr>
        <td style="padding:20px 32px;border-top:1px solid #1a1a1a;">
          <p style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#333;margin:0;">
            SONU KUMAR · PORTFOLIO
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

/* ── Confirmation email sent TO the sender ── */
const buildConfirmationHtml = (name: string) => `
<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8" /><title>Got your message</title></head>
  <body style="font-family:'Courier New',monospace;background:#0E0E0E;margin:0;padding:40px 0;">
    <table width="100%" cellspacing="0" cellpadding="0"
      style="max-width:560px;margin:0 auto;background:#111;border:1px solid #222;">

      <!-- header -->
      <tr>
        <td style="padding:24px 32px;border-bottom:1px solid #1a1a1a;">
          <span style="font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#C9F23D;">
            SONU KUMAR · PORTFOLIO
          </span>
        </td>
      </tr>

      <!-- body -->
      <tr>
        <td style="padding:40px 32px;">
          <p style="font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:#555;margin:0 0 16px;">
            Hey ${name}
          </p>
          <h1 style="font-size:28px;font-weight:900;text-transform:uppercase;color:#fff;margin:0 0 24px;line-height:1;">
            Message<br/>
            <span style="color:#C9F23D;">received.</span>
          </h1>
          <p style="font-size:14px;color:#888;line-height:1.8;margin:0 0 32px;">
            Thanks for reaching out. I've got your message and will get back to
            you as soon as I can — usually within 24–48 hours.
          </p>
          <div style="border-top:1px solid #1a1a1a;padding-top:24px;">
            <p style="font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:#444;margin:0;">
              In the meantime, check out my work at
              <a href="https://sonukumar1.netlify.app"
                style="color:#C9F23D;text-decoration:none;">
                sonukumar1.netlify.app
              </a>
            </p>
          </div>
        </td>
      </tr>

      <!-- footer -->
      <tr>
        <td style="padding:20px 32px;border-top:1px solid #1a1a1a;">
          <p style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#333;margin:0;">
            This is an automated reply · Do not respond to this email
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

/* ── Actions ── */

const sendConfirmation = async (email: string, name: string) => {
  try {
    await transporter.sendMail({
      from: '"Sonu Kumar" <sonu108rp@gmail.com>',
      to: email,
      subject: "Got your message — Sonu Kumar",
      html: buildConfirmationHtml(name),
    });
  } catch (err) {
    console.error("[sendConfirmation] failed:", err);
  }
};

export const sendEmail = async (
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> => {
  const { name, email, subject, message } = data;

  // Basic server-side validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, error: "Missing required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Invalid email address." };
  }

  try {
    await transporter.sendMail({
      from: '"Sonu Kumar Portfolio" <sonu108rp@gmail.com>',
      to: "sonu108rp@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject || "New message from " + name}`,
      html: buildNotificationHtml({ name, email, subject, message }),
    });

    await sendConfirmation(email, name);
    return { success: true };
  } catch (err) {
    console.error("[sendEmail] failed:", err);
    return { success: false, error: "Failed to send. Please try again." };
  }
};