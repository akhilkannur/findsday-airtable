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
  "Drop Number"?: number;
  "Drop Date"?: string;
  "Maker Name"?: string;
  "Maker Title"?: string;
  "Maker Quote"?: string;
  "Maker Photo"?: [{ url: string; filename: string; }];
  "Maker Profile Link"?: string;
  "Created At"?: string;
  "Updated At"?: string;
  Drop?: string[];
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
  console.log("🔍 Fetching latest drop number...");
  const dropsRecords = await base("Drops")
    .select({
      sort: [{ field: "Drop Date", direction: "desc" }], // Changed from "Drop Number"
      maxRecords: 1
    })
    .firstPage();
  
  const dropNumber = dropsRecords.length > 0 ? dropsRecords[0].fields["Drop Number"] : 1;
  console.log("📊 Latest drop number:", dropNumber);
  return dropNumber;
} catch (error) {
  console.error("❌ Error fetching latest drop number:", error);
  return 1;
}
}

// Helper function to fetch tools for the latest drop
export async function getToolsForLatestDrop() {
try {
  const latestDropNumber = await getLatestDropNumber();
  console.log("🛠️ Fetching tools for drop:", latestDropNumber);
  
  const toolsRecords = await base("Tools")
    .select({ 
      filterByFormula: `{Drop Number} = ${latestDropNumber}`, 
      sort: [{ field: "Name", direction: "asc" }] 
    })
    .firstPage();
  
  console.log("✅ Tools found:", toolsRecords.length);
  
  return toolsRecords.map((record) => ({
    id: record.id,
    fields: record.fields,
  })) as ToolRecord[];
} catch (error) {
  console.error("❌ Error fetching tools:", error);
  return [];
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
