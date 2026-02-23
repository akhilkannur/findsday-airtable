import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !sheetId) {
      console.error('Missing Google Sheets configuration');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Newsletter!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [new Date().toISOString(), email],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving to Google Sheets:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
