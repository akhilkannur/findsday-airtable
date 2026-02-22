import os
import json
import gspread
from google.oauth2.service_account import Credentials

# Configuration from Environment Variables
# Prioritize local file if available
CREDENTIALS_FILE = ".research/ga-credentials.json"
SHEET_ID = "1lISM0kMrJJSCs-e8nqBZKkKeNExtoXu5KD-mI4GvZN0"

def get_gc():
    scopes = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
    
    if os.path.exists(CREDENTIALS_FILE):
        credentials = Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=scopes)
    else:
        # Fallback to env vars
        client_email = os.environ.get("GOOGLE_CLIENT_EMAIL")
        private_key = os.environ.get("GOOGLE_PRIVATE_KEY")
        if not client_email or not private_key:
            raise ValueError("Missing ga-credentials.json OR env vars")
        
        pk = private_key.replace('\\n', '\n')
        info = {
            "type": "service_account",
            "private_key": pk,
            "client_email": client_email,
            "token_uri": "https://oauth2.googleapis.com/token",
        }
        credentials = Credentials.from_service_account_info(info, scopes=scopes)
        
    return gspread.authorize(credentials)

def add_tool_to_sheet(tool_data):
    """
    Adds a new tool row to the Google Sheet.
    tool_data: dict containing keys matching sheet columns
    """
    gc = get_gc()
    sh = gc.open_by_key(SHEET_ID)
    worksheet = sh.get_worksheet(0) # First tab (tools_export)
    
    # Get existing headers to ensure alignment
    headers = worksheet.row_values(1)
    
    # Build row based on headers
    row = []
    for h in headers:
        row.append(tool_data.get(h, ""))
    
    worksheet.append_row(row)
    print(f"✅ Successfully added {tool_data.get('name', 'new tool')} to Google Sheet.")

if __name__ == "__main__":
    print("Testing Google Sheet Connection...")
    try:
        gc = get_gc()
        sh = gc.open_by_key(SHEET_ID)
        print(f"✔ Connected to: {sh.title}")
    except Exception as e:
        print(f"❌ Connection failed: {e}")
