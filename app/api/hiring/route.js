import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, position, experience, availability, message } = body;

    // Validate required fields
    if (!name || !email || !position) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create transporter using SMTP (works with Gmail, Outlook, etc.)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Bounce It Up Website" <${process.env.SMTP_USER}>`,
      to: process.env.HIRING_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Job Application: ${position} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #FF4D00, #FFB800); padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">🎉 New Job Application</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">Bounce It Up Party — Livonia, MI</p>
          </div>

          <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
            <h2 style="color: #333; margin-top: 0; font-size: 18px; border-bottom: 2px solid #FF4D00; padding-bottom: 10px;">Applicant Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 140px;">Name</td><td style="padding: 8px 0; color: #333; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #FF4D00;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0; color: #333;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Position</td><td style="padding: 8px 0; color: #333; font-weight: bold;">${position}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Experience</td><td style="padding: 8px 0; color: #333;">${experience || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Availability</td><td style="padding: 8px 0; color: #333;">${availability || 'Not specified'}</td></tr>
            </table>
          </div>

          ${message ? `
          <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
            <h3 style="color: #333; margin-top: 0;">Additional Message</h3>
            <p style="color: #555; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}

          <p style="color: #888; font-size: 12px; text-align: center; margin-top: 20px;">
            Submitted via bounceituplivonia.com on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Hiring form email error:', err);
    // Return success to the user anyway — don't expose server errors
    // Log them server-side
    return NextResponse.json({ success: true, warning: 'Email delivery may be delayed' });
  }
}
