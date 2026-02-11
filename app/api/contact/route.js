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
        <h3>Contact Details</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Subject:</strong> ${subject}</li>
        </ul>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ message: 'Error sending message. Please try again later.' }, { status: 500 });
  }
}
