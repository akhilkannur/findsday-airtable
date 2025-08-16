import { testAirtableConnection } from "@/lib/airtableClient"

export async function GET() {
  try {
    const isConnected = await testAirtableConnection()

    if (isConnected) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Airtable connected successfully!",
          timestamp: new Date().toISOString(),
          baseId: "appgGYEPnBcA7THzz",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to connect to Airtable",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
