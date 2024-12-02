import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    await sendgrid.send({
      to: email,
      from: process.env.EMAIL_FROM as string,
      subject: 'Thank you for subscribing to Salem!',
      text: 'You have successfully subscribed to our email anomaly alerts!',
    });

    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
