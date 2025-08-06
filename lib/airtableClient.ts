// lib/airtableClient.ts
import Airtable from "airtable";

// IMPORTANT: Remove the hardcoded API key for security!
// Use environment variables only
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey) {
  throw new Error('AIRTABLE_API_KEY environment variable is required');
}

if (!baseId) {
  throw new Error('AIRTABLE_BASE_ID environment variable is required');
}

// Correct way to configure Airtable
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: apiKey,
});

// Create the base instance
export const base = Airtable.base(baseId);

// Define types for our Airtable records based on your exact schema
// Tools Table
export interface ToolRecord {
  id: string;
  fields: {
    Name?: string;
    Category?: "CRM" | "Lead Generation" | "Analytics" | "Automation" | "Communication" | "Other";
    Tagline?: string;
    Description?: string;
    Image?: [{ url: string; filename: string; }];
    "Website URL"?: string;
    "Drop Date"?: string;
    "Drop Number (Rollup)"?: number; // Added for the new Rollup field
    "Maker Name"?: string;
    "Maker Title"?: string;
    "Maker Quote"?: string;
    "Maker Photo"?: [{ url: string; filename: string; }];
    "Maker Profile Link"?: string;
    "Created At"?: string;
    "Updated At"?: string;
    Drop?: string[]; // This is the linked record field
    Maker?: string[];
  };
}

// Subscribers Table
export interface SubscriberRecord {
  id: string;
  fields: {
    Email?: string;
    "Subscribed At"?: string;
    Status?: "Active" | "Unsubscribed";
  };
}

// Makers Table
export interface MakerRecord {
  id: string;
  fields: {
    Name?: string;
    Bio?: string;
    Photo?: [{ url: string; filename: string; }];
    "Profile Link"?: string;
    "Created At"?: string;
    "Updated At"?: string;
    Tools?: string[];
    "Maker Title"?: string; // Added this field
    "Maker Quote"?: string; // Added this field
  };
}

// Sponsors Table
export interface SponsorRecord {
  id: string;
  fields: {
    Name?: string;
    Blurb?: string;
    Logo?: [{ url: string; filename: string; }];
    "Website URL"?: string;
    "Created At"?: string;
    "Updated At"?: string;
  };
}

// Drops Table
export interface DropRecord {
  id: string;
  fields: {
    "Drop Number"?: number;
    "Drop Date"?: string;
    Tools?: string[];
    "Tools Count"?: number;
    "Created At"?: string;
    "Updated At"?: string;
  };
}

// Helper function to fetch the latest drop number
export async function getLatestDropNumber() {
  try {
    console.log("🔍 Fetching latest drop number (simplified query for debugging)...");
    const dropsRecords = await base("Drops")
      .select({
        // Temporarily removed sort to isolate UNKNOWN_FIELD_NAME error source
        maxRecords: 1
      })
      .firstPage();

    let dropNumber: number = 1; // Initialize with a default number

    if (dropsRecords.length > 0) {
      const latestDropRecord = dropsRecords[0];
      // Log the entire fields object to debug what Airtable is actually returning
      console.log("DEBUG: Latest Drop Record fields received from Airtable:", latestDropRecord.fields);

      // Safely access "Drop Number" using optional chaining and nullish coalescing
      const rawDropNumber = latestDropRecord.fields?.["Drop Number"]; 
      
      if (typeof rawDropNumber === 'number') {
        dropNumber = rawDropNumber;
      } else if (typeof rawDropNumber === 'string' && !isNaN(parseInt(rawDropNumber))) {
        // Attempt to parse if it's a string that looks like a number
        dropNumber = parseInt(rawDropNumber);
        console.warn("⚠️ 'Drop Number' field from Airtable was a string, parsed to number.");
      } else {
        console.warn("⚠️ 'Drop Number' field from Airtable is not a number or parsable string, defaulting to 1. Raw value:", rawDropNumber);
      }
    } else {
      console.warn("⚠️ No records found in 'Drops' table, defaulting latest drop number to 1.");
    }
    
    console.log("📊 Latest drop number:", dropNumber);
    return dropNumber;
  } catch (error) {
    console.error("❌ Error fetching latest drop number:", error);
    // If there's an error, it might be due to the field not existing or other API issues.
    // We should still return a default to prevent the app from crashing.
    return 1;
  }
}

// Helper function to test Airtable connection
export async function testAirtableConnection() {
  try {
    console.log("🔍 Testing Airtable connection...");
    
    // Test basic connection with a simple query
    const records = await base("Tools")
      .select({
        maxRecords: 1,
      })
      .firstPage();
    
    console.log("✅ Airtable connection successful! Sample records:", records.length);
    
    // Also test the Drops table
    const dropsTest = await base("Drops")
      .select({ maxRecords: 1 })
      .firstPage();
    
    console.log("✅ Drops table accessible! Records:", dropsTest.length);
    
    return true;
  } catch (error) {
    console.error("❌ Airtable connection failed:", error);
    
    // More detailed error information
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    
    return false;
  }
}

// Export the base and record types for use in other files
export default base;
