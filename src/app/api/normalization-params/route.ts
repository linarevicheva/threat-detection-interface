import { NextResponse } from 'next/server';

export async function GET() {
  try {
   //const FASTAPI_BASE_URL = 'http://127.0.0.1:8000';
  const FASTAPI_BASE_URL = "https://model-service-dot-threat-detection-436007.wl.r.appspot.com/api"

    const response = await fetch(`${FASTAPI_BASE_URL}/normalization-params`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch normalization parameters. Status: ${response.status}`);
      return NextResponse.json(
        { error: 'Failed to fetch normalization parameters from backend.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.mean || !data.std) {
      console.error('Invalid normalization parameters received:', data);
      return NextResponse.json(
        { error: 'Invalid normalization parameters received from backend.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      mean: data.mean,
      std: data.std,
    });
  } catch (error) {
    console.error('Error fetching normalization parameters:', error);
    return NextResponse.json(
      { error: 'Internal Server Error while fetching normalization parameters.' },
      { status: 500 }
    );
  }
}
