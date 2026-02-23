import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheetId) {
      console.error('Missing Google Sheet ID');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Load credentials from JSON env var or individual env vars
    let credentials;
    const credentialsJson = process.env.GOOGLE_CREDENTIALS_JSON;
    
    if (credentialsJson) {
      credentials = JSON.parse(credentialsJson);
    } else {
      // Fallback to individual env vars
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY;
      
      if (!clientEmail || !privateKey) {
        console.error('Missing Google credentials');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
      }
      
      credentials = {
        type: 'service_account',
        private_key: privateKey.replace(/\\n/g, '\n'),
        client_email: clientEmail,
        token_uri: 'https://oauth2.googleapis.com/token',
      };
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
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
          values: [[new Date().toISOString(), email]],
        },
      });
    } catch (appendError: any) {
      // If sheet doesn't exist, create it
      if (appendError.message?.includes('Unable to parse range')) {
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
