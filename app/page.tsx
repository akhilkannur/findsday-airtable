// app/page.tsx
import { base } from "@/lib/airtableClient";

export const dynamic = "force-dynamic";

async function getHomePageData() {
  try {
    // Fetch the latest drop number
    const dropsRecords = await base("Drops")
      .select({
        sort: [{ field: "Drop Number", direction: "desc" }],
        maxRecords: 1,
      })
      .firstPage();
    const latestDropNumber = dropsRecords.length > 0 ? dropsRecords[0].fields["Drop Number"] : 1;

    // Fetch tools for the latest drop
    const toolsRecords = await base("Tools")
      .select({
        filterByFormula: `{Drop Number} = ${latestDropNumber}`,
        sort: [{ field: "Name", direction: "asc" }],
      })
      .firstPage();

    return {
      tools: toolsRecords.map((record) => ({
        id: record.id,
        fields: record.fields,
      })),
      latestDropNumber,
    };
  } catch (error
