// lib/airtableClient.ts
import Airtable from "airtable"

// IMPORTANT: Remove the hardcoded API key for security!
// Use environment variables only
const apiKey = process.env.AIRTABLE_API_KEY
const baseId = process.env.AIRTABLE_BASE_ID

if (typeof window !== "undefined") {
  throw new Error("Airtable client should only be used on the server side")
}

if (!apiKey) {
  throw new Error("AIRTABLE_API_KEY environment variable is required")
}

if (!baseId) {
  throw new Error("AIRTABLE_BASE_ID environment variable is required")
}

// Correct way to configure Airtable
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: apiKey,
})

// Create the base instance
export const base = Airtable.base(baseId)

// Define types for our Airtable records based on your exact schema
// Tools Table
export interface ToolRecord {
  id: string
  fields: {
    Name?: string
    Category?: "CRM" | "Lead Generation" | "Analytics" | "Automation" | "Communication" | "Other"
    Tagline?: string
    Description?: string
    Image?: [{ url: string; filename: string }]
    "Website URL"?: string
    "Drop Date"?: string
    "Drop Number (Rollup)"?: number // Added for the new Rollup field
    "Maker Name"?: string
    "Maker Title"?: string
    "Maker Quote"?: string
    "Maker Photo"?: [{ url: string; filename: string }]
    "Maker Profile Link"?: string
    "Created At"?: string
    "Updated At"?: string
    Drop?: string[] // This is the linked record field
    Maker?: string[]
  }
}

// Subscribers Table
export interface SubscriberRecord {
  id: string
  fields: {
    Email?: string
    "Subscribed At"?: string
    Status?: "Active" | "Unsubscribed"
  }
}

// Makers Table
export interface MakerRecord {
  id: string
  fields: {
    Name?: string
    Bio?: string // Added Bio field
    Photo?: [{ url: string; filename: string }]
    "Profile Link"?: string
    "Created At"?: string
    "Updated At"?: string
    Tools?: string[]
    "Maker Title"?: string // Added this field
    "Maker Quote"?: string // Added this field
  }
}

// Sponsors Table
export interface SponsorRecord {
  id: string
  fields: {
    Name?: string
    Blurb?: string
    Logo?: [{ url: string; filename: string }]
    "Website URL"?: string
    "Created At"?: string
    "Updated At"?: string
  }
}

// Drops Table
export interface DropRecord {
  id: string
  fields: {
    "Drop Number"?: number
    "Drop Date"?: string
    "Short Description"?: string // New field for drop short description
    Tools?: string[] // Linked record IDs to Tools table
    "Tools Count"?: number
    "Created At"?: string
    "Updated At"?: string
    "Is Featured"?: boolean // New field for featuring drops
  }
}

// Directory Tools Table - separate from the weekly drops Tools table
export interface DirectoryToolRecord {
  id: string
  fields: {
    Name?: string
    Category?:
      | "CRM"
      | "Lead Generation"
      | "Analytics"
      | "Automation"
      | "Communication"
      | "Sales Enablement"
      | "Productivity"
      | "Marketing"
      | "Customer Support"
      | "Other"
    Description?: string
    "Short Description"?: string // For card display
    Logo?: [{ url: string; filename: string }]
    "Website URL"?: string
    "Pricing Model"?: "Free" | "Freemium" | "Paid" | "Enterprise"
    "Starting Price"?: string
    "Deal Available"?: boolean // For showing deal badges
    "Deal Description"?: string
    "Deal URL"?: string
    Tags?: string // Comma-separated tags
    "Company Name"?: string
    "Founded Year"?: number
    "Team Size"?: string
    Headquarters?: string
    "Key Features"?: string // Multi-line text for detail page
    "Use Cases"?: string // Multi-line text for detail page
    Integrations?: string // Comma-separated list
    Pros?: string // Multi-line text
    Cons?: string // Multi-line text
    "User Rating"?: number // 1-5 scale
    "Review Count"?: number
    Featured?: boolean // For highlighting certain tools
    Sponsored?: boolean // For sponsored listings that appear at top
    Status?: "Active" | "Inactive" | "Coming Soon"
    "Created At"?: string
    "Updated At"?: string
  }
}

// Helper function to fetch the latest drop number
export async function getLatestDropNumber() {
  try {
    console.log("🔍 Fetching latest drop number (simplified query for debugging)...")
    const dropsRecords = await base("Drops")
      .select({
        sort: [{ field: "Drop Number", direction: "desc" }], // Sort by Drop Number
        maxRecords: 1,
      })
      .firstPage()

    let dropNumber = 1 // Initialize with a default number

    if (dropsRecords.length > 0) {
      const latestDropRecord = dropsRecords[0]
      // Log the entire fields object to debug what Airtable is actually returning
      console.log("DEBUG: Latest Drop Record fields received from Airtable:", latestDropRecord.fields)

      // Safely access "Drop Number" using optional chaining and nullish coalescing
      const rawDropNumber = latestDropRecord.fields?.["Drop Number"]

      if (typeof rawDropNumber === "number") {
        dropNumber = rawDropNumber
      } else if (typeof rawDropNumber === "string" && !isNaN(Number.parseInt(rawDropNumber))) {
        // Attempt to parse if it's a string that looks like a number
        dropNumber = Number.parseInt(rawDropNumber)
        console.warn("⚠️ 'Drop Number' field from Airtable was a string, parsed to number.")
      } else {
        console.warn(
          "⚠️ 'Drop Number' field from Airtable is not a number or parsable string, defaulting to 1. Raw value:",
          rawDropNumber,
        )
      }
    } else {
      console.warn("⚠️ No records found in 'Drops' table, defaulting latest drop number to 1.")
    }

    console.log("📊 Latest drop number:", dropNumber)
    return dropNumber
  } catch (error) {
    console.error("❌ Error fetching latest drop number:", error)
    // If there's an error, it might be due to the field not existing or other API issues.
    // We should still return a default to prevent the app from crashing.
    return 1
  }
}

// New helper function to get the featured drop and archived drops
export async function getFeaturedDropAndArchivedDrops(): Promise<{
  featuredDrop: DropRecord | null
  archivedDrops: DropRecord[]
}> {
  try {
    console.log("🔍 Fetching all drops to determine featured and archived drops...")
    const allDrops = (await base("Drops")
      .select({
        sort: [{ field: "Drop Date", direction: "desc" }], // Sort by date to prioritize latest if no feature is set
      })
      .all()) as unknown as DropRecord[]

    let featuredDrop: DropRecord | null = null
    let archivedDrops: DropRecord[] = []

    // Try to find a drop explicitly marked as featured
    const featuredCandidates = allDrops.filter((drop) => drop.fields["Is Featured"])
    if (featuredCandidates.length > 0) {
      // If multiple are featured, pick the latest one by date
      featuredDrop = featuredCandidates.sort((a, b) => {
        const dateA = new Date(a.fields["Drop Date"] || 0).getTime()
        const dateB = new Date(b.fields["Drop Date"] || 0).getTime()
        return dateB - dateA
      })[0]
    } else if (allDrops.length > 0) {
      // If no drop is explicitly featured, pick the latest one by date
      featuredDrop = allDrops[0]
    }

    // Populate archived drops (all drops except the featured one)
    if (featuredDrop) {
      archivedDrops = allDrops.filter((drop) => drop.id !== featuredDrop?.id)
    } else {
      archivedDrops = allDrops // If no featured drop, all are considered archived
    }

    console.log(
      `✅ Found featured drop: ${featuredDrop?.fields["Drop Number"] || "None"}. Archived drops count: ${archivedDrops.length}`,
    )
    return { featuredDrop, archivedDrops }
  } catch (error) {
    console.error("❌ Error fetching featured and archived drops:", error)
    return { featuredDrop: null, archivedDrops: [] }
  }
}

// Helper function to test Airtable connection
export async function testAirtableConnection() {
  try {
    console.log("🔍 Testing Airtable connection...")

    // Test basic connection with a simple query
    const records = await base("Tools")
      .select({
        maxRecords: 1,
      })
      .firstPage()

    console.log("✅ Airtable connection successful! Sample records:", records.length)

    // Also test the Drops table
    const dropsTest = await base("Drops").select({ maxRecords: 1 }).firstPage()

    console.log("✅ Drops table accessible! Records:", dropsTest.length)

    return true
  } catch (error) {
    console.error("❌ Airtable connection failed:", error)

    // More detailed error information
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      })
    }

    return false
  }
}

// Helper function to fetch all directory tools with optional filtering
export async function getDirectoryTools(options?: {
  category?: string
  featured?: boolean
  limit?: number
}): Promise<DirectoryToolRecord[]> {
  try {
    console.log("🔍 Fetching directory tools...", options)

    let filterFormula = "{Status} = 'Active'" // Only show active tools

    if (options?.category) {
      filterFormula = `AND(${filterFormula}, {Category} = '${options.category}')`
    }

    if (options?.featured) {
      filterFormula = `AND(${filterFormula}, {Featured} = TRUE())`
    }

    const selectOptions: any = {
      filterByFormula: filterFormula,
      sort: [
        { field: "Sponsored", direction: "desc" }, // Sponsored tools first
        { field: "Featured", direction: "desc" }, // Then featured tools
        { field: "Name", direction: "asc" }, // Then alphabetical
      ],
    }

    if (options?.limit) {
      selectOptions.maxRecords = options.limit
    }

    console.log("🔍 Using filter formula:", filterFormula)
    const records = (await base("Directory Tools").select(selectOptions).all()) as unknown as DirectoryToolRecord[]

    console.log(`✅ Found ${records.length} directory tools`)
    return records
  } catch (error) {
    console.error("❌ Error fetching directory tools:", error)
    throw error // Re-throw to see the actual error in API route
  }
}

// Helper function to get a single directory tool by ID
export async function getDirectoryTool(id: string): Promise<DirectoryToolRecord | null> {
  try {
    console.log("🔍 Fetching directory tool:", id)
    const record = (await base("Directory Tools").find(id)) as unknown as DirectoryToolRecord
    console.log("✅ Found directory tool:", record.fields.Name)
    return record
  } catch (error) {
    console.error("❌ Error fetching directory tool:", error)
    return null
  }
}

// Helper function to get unique categories from directory tools
export async function getDirectoryCategories(): Promise<string[]> {
  try {
    console.log("🔍 Fetching directory categories...")
    const records = (await base("Directory Tools")
      .select({
        filterByFormula: "{Status} = 'Active'",
        fields: ["Category"],
      })
      .all()) as unknown as DirectoryToolRecord[]

    const categories = [...new Set(records.map((record) => record.fields.Category).filter(Boolean))].sort()

    console.log("✅ Found categories:", categories)
    return categories
  } catch (error) {
    console.error("❌ Error fetching directory categories:", error)
    return []
  }
}

// Export the base and record types for use in other files
export default base
