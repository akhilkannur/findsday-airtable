// app/api/tool/[id]/route.ts
import { base, type ToolRecord } from "@/lib/airtableClient";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    console.log(`Fetching tool with ID: ${id}`);
    const record = await base("Tools").find(id);

    if (!record) {
      return new Response(
        JSON.stringify({ success: false, message: "Tool not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const tool: ToolRecord = {
      id: record.id,
      fields: record.fields,
    };

    console.log(`Successfully fetched tool: ${tool.fields.Name}`);
    return new Response(
      JSON.stringify({ success: true, tool }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(`Error fetching tool ${id}:`, error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error fetching tool details",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
