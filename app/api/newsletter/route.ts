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

    // Try to append - if sheet doesn't exist, create it first
    try {
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
    } catch (appendError: any) {
      // If sheet doesn't exist, create it
      if (appendError.message?.includes('Unable to parse range')) {
        // Create the Newsletter sheet
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetExists = spreadsheet.data.sheets?.some(s => s.properties?.title === 'Newsletter');
        
        if (!sheetExists) {
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
              requests: [{
                addSheet: {
                  properties: {
                    title: 'Newsletter',
                    gridProperties: { rowCount: 1000, columnCount: 26 }
                  }
                }
              }]
            }
          });
          
          // Add headers
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Newsletter!A1:B1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: [['Timestamp', 'Email']],
            },
          });
        }
        
        // Now append the email
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'Newsletter!A:B',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[new Date().toISOString(), email]],
          },
        });
      } else {
        throw appendError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving to Google Sheets:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
