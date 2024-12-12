import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sequence } = body;

    const TIME_STEPS = 288;
    if (!sequence || !Array.isArray(sequence) || sequence.length !== TIME_STEPS) {
      return NextResponse.json(
        { error: `Input sequence must be an array of length ${TIME_STEPS}` },
        { status: 400 }
      );
    }

    if (!sequence.every((value) => typeof value === 'number')) {
      console.error('Sequence contains non-numeric values:', sequence);
      return NextResponse.json(
        { error: 'All values in the input sequence must be numbers.' },
        { status: 400 }
      );
    }

    const modelServiceUrl = 'https://model-service-dot-threat-detection-436007.wl.r.appspot.com/api/predict';
    //const modelServiceUrl = 'http://127.0.0.1:8000/api/predict'
    const response = await fetch(modelServiceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: sequence }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from model service:', errorText);
      return NextResponse.json(
        { error: 'Error from model service', details: errorText },
        { status: response.status }
      );
    }

    const modelResponse = await response.json();
    const { isAnomalous, meanReconstructionError, threshold } = modelResponse;

    if (isAnomalous) {
      await sendEmailAlert(
        process.env.ALERT_EMAIL!,
        'Anomaly Detected',
        `An anomaly was detected with the following details:
        
        - Mean Reconstruction Error: ${meanReconstructionError}
        - Threshold: ${threshold}

        Please investigate further.`
      );
    }

    console.log("Model response:", modelResponse);

    return NextResponse.json(modelResponse);
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

async function sendEmailAlert(to: string, subject: string, message: string) {
  try {
    await sendgrid.send({
      to,
      from: process.env.EMAIL_FROM as string,
      subject,
      text: message,
    });
    console.log('Email alert sent successfully');
  } catch (error) {
    console.error('Failed to send email alert:', error);
  }
}
