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
  } catch (error) {
    console.error("Error fetching data:", error);
    return { tools: [], latestDropNumber: 1 };
  }
}

export default async function Home() {
  const { tools, latestDropNumber } = await getHomePageData();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Drop #{latestDropNumber}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div key={tool.id} className="p-4 border rounded">
            <h2 className="text-xl font-bold">{tool.fields.Name}</h2>
            <p>{tool.fields.Tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
