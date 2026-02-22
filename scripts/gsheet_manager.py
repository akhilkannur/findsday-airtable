import os
import json
import gspread
from google.oauth2.service_account import Credentials

# Configuration
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
            raise ValueError("Missing credentials file or env vars")
        
        pk = private_key.replace('\\n', '\n')
        info = {
            "type": "service_account",
            "private_key": pk,
            "client_email": client_email,
            "token_uri": "https://oauth2.googleapis.com/token",
        }
        credentials = Credentials.from_service_account_info(info, scopes=scopes)
        
    return gspread.authorize(credentials)

def update_or_add_tool(tool_data):
    """
    Updates an existing tool row (matched by slug) or adds a new one.
    tool_data: dict containing keys matching sheet columns
    """
    gc = get_gc()
    sh = gc.open_by_key(SHEET_ID)
    worksheet = sh.get_worksheet(0) # tools_export tab
    
    headers = worksheet.row_values(1)
    slug_idx = headers.index('slug') + 1 # 1-based index
    
    slug = tool_data.get('slug')
    if not slug:
        print("❌ Error: Tool data missing 'slug'")
        return

    # Find existing row
    try:
        cell = worksheet.find(slug, in_column=slug_idx)
        row_num = cell.row
        print(f"Found existing tool with slug '{slug}' at row {row_num}. Updating...")
        
        # Prepare updates
        # We fetch the full row to avoid unnecessary API calls if possible,
        # but for simplicity, we'll update specific cells.
        updates = []
        for key, value in tool_data.items():
            if key in headers:
                col_num = headers.index(key) + 1
                updates.append({
                    'range': gspread.utils.rowcol_to_a1(row_num, col_num),
                    'values': [[value]]
                })
        
        worksheet.batch_update(updates)
        print(f"✅ Successfully updated '{slug}'.")
        
    except gspread.exceptions.CellNotFound:
        print(f"Slug '{slug}' not found. Adding as a new tool...")
        row = [tool_data.get(h, "") for h in headers]
        worksheet.append_row(row)
        print(f"✅ Successfully added new tool '{slug}'.")

if __name__ == "__main__":
    # If run directly, show status
    print("Google Sheet Manager Ready.")
    try:
        gc = get_gc()
        sh = gc.open_by_key(SHEET_ID)
        print(f"✔ Connected to: {sh.title}")
    except Exception as e:
        print(f"❌ Connection failed: {e}")
