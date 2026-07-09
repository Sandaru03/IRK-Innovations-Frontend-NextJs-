import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req) {
  try {
    // We don't strictly need DB for email, but safe to have if we log later
    // await dbConnect();

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ message: 'Email service not configured.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'IRK Innovations <onboarding@resend.dev>',
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @media only screen and (max-width: 600px) {
              .email-container { width: 100% !important; border-radius: 0 !important; }
              .header { padding: 20px !important; }
              .content { padding: 20px 15px !important; }
              .details-box { padding: 15px !important; margin-top: 15px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; color: #111827; padding: 20px 10px; width: 100%; box-sizing: border-box;">
            <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); width: 100%;">
              
              <!-- Header -->
              <div class="header" style="background-color: #064e3b; padding: 30px; text-align: center; border-bottom: 5px solid #facc15;">
                <h2 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; word-break: break-word;">IRK INNOVATIONS</h2>
                <p style="margin: 5px 0 0 0; color: #6ee7b7; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">New Contact Inquiry</p>
              </div>

              <!-- Content -->
              <div class="content" style="padding: 40px 30px;">
                <p style="margin-top: 0; color: #4b5563; font-size: 16px; line-height: 1.6;">You have received a new message from the website contact form. Here are the details:</p>
                
                <div class="details-box" style="background-color: #f3f4f6; border-radius: 12px; padding: 25px; margin-top: 25px;">
                  <div style="margin-bottom: 20px;">
                    <p style="margin: 0 0 5px 0; color: #064e3b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Full Name</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #111827; word-break: break-word;">${name}</p>
                  </div>

                  <div style="margin-bottom: 20px;">
                    <p style="margin: 0 0 5px 0; color: #064e3b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Email Address</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; word-break: break-word;">
                      <a href="mailto:${email}" style="color: #047857; text-decoration: none;">${email}</a>
                    </p>
                  </div>

                  <div style="margin-bottom: 20px;">
                    <p style="margin: 0 0 5px 0; color: #064e3b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #111827; word-break: break-word;">${subject}</p>
                  </div>

                  <div>
                    <p style="margin: 0 0 8px 0; color: #064e3b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                    <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${message}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #9ca3af; font-size: 13px;">&copy; ${new Date().getFullYear()} IRK Innovations. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ message: 'Error sending message. Please try again later.' }, { status: 500 });
  }
}
