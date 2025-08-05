// lib/airtableClient.ts
import Airtable from "airtable";

// Initialize Airtable client with your API key from environment variables
const airtable = new Airtable({
  apiKey:
    process.env.AIRTABLE_API_KEY ||
    "patLThQ1nBZo3JBv.9f154b9102ac5ead3bade13b9f0439c338f2b4606b7fab1035f7e641f7c816",
});

// Your actual Airtable base ID
export const base = airtable.base(process.env.AIRTABLE_BASE_ID || "appgGYEPnBcA7TH");

// Define types for our Airtable records based on your exact schema
// Tools Table
export interface ToolRecord {
  id: string;
  fields: {
    Name?: string; // Made optional
    Category?: "CRM" | "Lead Generation" | "Analytics" | "Automation" | "Communication" | "Other"; // Made optional
    Tagline?: string; // Made optional
    Description?: string;
    Image?: [{ url: string; filename: string; }]; // Attachment field
    "Website URL"?: string;
    "Drop Number"?: number; // Made optional
    "Drop Date"?: string; // Date string - Made optional
    "Maker Name"?: string;
    "Maker Title"?: string;
    "Maker Quote"?: string;
    "Maker Photo"?: [{ url: string; filename: string; }];
    "Maker Profile Link"?: string;
    "Created At"?: string; // Formula field
    "Updated At"?: string; // Formula field
    Drop?: string[]; // Linked record to Drops table
    Maker?: string[]; // Linked record to Makers table
  }
}

// Subscribers Table
export interface SubscriberRecord {
  id: string;
  fields: {
    Email?: string; // Made optional
    "Subscribed At"?: string; // Formula field
    Status?: "Active" | "Unsubscribed"; // Made optional
  }
}

// Makers Table
export interface MakerRecord {
  id: string;
  fields: {
    Name?: string; // Made optional
    Bio?: string;
    Photo?: [{ url: string; filename: string; }];
    "Profile Link"?: string;
    "Created At"?: string; // Formula field
    "Updated At"?: string; // Formula field
    Tools?: string[]; // Linked record to Tools table
  }
}

// Sponsors Table
export interface SponsorRecord {
  id: string;
  fields: {
    Name?: string; // Made optional
    Blurb?: string;
    Logo?: [{ url: string; filename: string; }];
    "Website URL"?: string;
    "Created At"?: string; // Formula field
    "Updated At"?: string; // Formula field
  }
}

// Drops Table
export interface DropRecord {
  id: string;
  fields: {
    "Drop Number"?: number; // Made optional
    "Drop Date"?: string; // Date string - Made optional
    Tools?: string[]; // Linked record to Tools table
    "Tools Count"?: number; // Count field
    "Created At"?: string; // Formula field
    "Updated At"?: string; // Formula field
  }
}

// Helper function to fetch the latest drop number
export async function getLatestDropNumber() {
  const dropsRecords = await base("Drops")
    .select({ sort: [{ field: "Drop Number", direction: "desc" }], maxRecords: 1 })
    .firstPage();
  return dropsRecords.length > 0 ? dropsRecords[0].fields["Drop Number"] : 1;
}

// Helper function to fetch tools for the latest drop
export async function getToolsForLatestDrop() {
  const latestDropNumber = await getLatestDropNumber();
  const toolsRecords = await base("Tools")
    .select({ filterByFormula: `{Drop Number} = ${latestDropNumber}`, sort: [{ field: "Name", direction: "asc" }] })
    .firstPage();
  return toolsRecords.map((record) => ({
    id: record.id,
    fields: record.fields,
  })) as ToolRecord[];
}

// Helper function to test Airtable connection
export async function testAirtableConnection() {
  try {
    console.log("Testing Airtable connection...");
    const records = await base("Tools")
      .select({
        maxRecords: 1,
      })
      .firstPage();
    console.log("Airtable connection successful!");
    return true;
  } catch (error) {
    console.error("Airtable connection failed:", error);
    return false;
  }
}

// Export the base and record types for use in other files
export default airtable;
