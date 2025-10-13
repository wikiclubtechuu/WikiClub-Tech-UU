import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const scriptURL = process.env.GOOGLE_SHEETS_API_URL;

  try {
        if (!scriptURL) {
      throw new Error('GOOGLE_SHEETS_API_URL environment variable is not set');
    }
    fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, secret: 'wikiNewsLetterForumOnly' }),
    });

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
