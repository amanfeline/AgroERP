// src/utils/email.js
// Nodemailer transporter + branded HTML email sender

import nodemailer from 'nodemailer';

/**
 * Lazily-created Nodemailer transporter (SMTP).
 * Re-used across calls within the same process lifetime.
 */
let _transporter = null;

const getTransporter = () => {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: Number(process.env.MAIL_PORT) === 465, // true for port 465, false for others
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }
  return _transporter;
};

/**
 * Build a branded HTML email body for password-reset requests.
 *
 * @param {string} resetLink – Full reset URL including token query param
 * @param {number} expiresMin – Minutes until the link expires
 * @returns {string} HTML string
 */
const buildResetEmailHtml = (resetLink, expiresMin) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password – AgroERP</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:12px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2d6a4f 0%,#40916c 100%);
                        padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;
                          letter-spacing:-0.5px;">🌱 AgroERP</h1>
              <p style="margin:8px 0 0;color:#b7e4c7;font-size:14px;">
                Agricultural Enterprise Resource Planning
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 16px;color:#1b4332;font-size:22px;font-weight:600;">
                Reset Your Password
              </h2>
              <p style="margin:0 0 24px;color:#4a5568;font-size:15px;line-height:1.6;">
                We received a request to reset the password for your AgroERP account.
                Click the button below to choose a new password.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding:8px 0 32px;">
                    <a href="${resetLink}"
                       style="display:inline-block;background:linear-gradient(135deg,#2d6a4f,#40916c);
                              color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;
                              padding:14px 36px;border-radius:8px;
                              box-shadow:0 4px 12px rgba(45,106,79,0.35);">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;color:#718096;font-size:13px;">
                ⏱ This link expires in <strong>${expiresMin} minutes</strong>.
              </p>
              <p style="margin:0 0 24px;color:#718096;font-size:13px;">
                If you didn't request a password reset, please ignore this email — your
                account remains secure.
              </p>

              <hr style="border:none;border-top:1px solid #e8f5e9;margin:0 0 24px;" />

              <p style="margin:0;color:#a0aec0;font-size:12px;word-break:break-all;">
                If the button above doesn't work, copy and paste this URL into your browser:<br />
                <a href="${resetLink}" style="color:#40916c;">${resetLink}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fffe;padding:20px 40px;text-align:center;
                        border-top:1px solid #e8f5e9;">
              <p style="margin:0;color:#a0aec0;font-size:12px;">
                © ${new Date().getFullYear()} AgroERP. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

/**
 * Send a password-reset email to the given address.
 *
 * @param {string} toEmail   – Recipient email address
 * @param {string} resetLink – Full reset URL (with token)
 */
export const sendPasswordResetEmail = async (toEmail, resetLink) => {
  const expiresMin = Number(process.env.RESET_TOKEN_EXPIRES_MIN) || 15;

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: toEmail,
    subject: '🔒 Reset Your AgroERP Password',
    html: buildResetEmailHtml(resetLink, expiresMin),
  });
};
