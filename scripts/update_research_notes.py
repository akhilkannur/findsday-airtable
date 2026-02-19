import pandas as pd
import sys

def update_research_notes(company_name, note):
    """
    Updates the research notes for a given company in the CSV file.

    Args:
        company_name (str): The name of the company to update.
        note (str): The research note to add.
    """
    csv_path = 'agent-reference/pure_salestech.csv'
    try:
        df = pd.read_csv(csv_path)
        if 'Research Notes' not in df.columns:
            df['Research Notes'] = ''
        
        # Find the row with the matching company name (case-insensitive)
        row_index = df[df['Company Name'].str.lower() == company_name.lower()].index
        
        if not row_index.empty:
            df.loc[row_index[0], 'Research Notes'] = note
            df.to_csv(csv_path, index=False)
            print(f"Successfully updated research notes for '{company_name}'.")
        else:
            print(f"Error: Company '{company_name}' not found in the CSV file.")

    except FileNotFoundError:
        print(f"Error: The file '{csv_path}' was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python update_research_notes.py <company_name> "<research_note>"")
        sys.exit(1)
    
    company_name = sys.argv[1]
    research_note = sys.argv[2]
    update_research_notes(company_name, research_note)
