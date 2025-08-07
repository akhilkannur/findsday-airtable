import Image from 'next/image';
import Link from 'next/link';
import { base, type DropRecord, type ToolRecord } from "@/lib/airtableClient";
import Header from '@/components/Header';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'; // Added FileText

export const dynamic = 'force-dynamic'; // Ensure this page is dynamic

async function getDropDetails(dropId: string): Promise<{ drop: DropRecord | null; tools: ToolRecord[] }> {
try {
console.log(`Fetching drop details for ID: ${dropId}`);
const dropRecord = await base("Drops").find(dropId);

if (!dropRecord) {
  console.warn(`Drop with ID ${dropId} not found.`);
  return { drop: null, tools: [] };
}

const drop: DropRecord = {
  id: dropRecord.id,
  fields: dropRecord.fields,
};

let tools: ToolRecord[] = [];
if (drop.fields.Tools && drop.fields.Tools.length > 0) {
  console.log(`Fetching ${drop.fields.Tools.length} tools for drop ${drop.fields["Drop Number"]}`);
  const toolPromises = drop.fields.Tools.map(toolId => base("Tools").find(toolId));
  const rawTools = await Promise.all(toolPromises);
  tools = rawTools.map(record => ({
    id: record.id,
    fields: record.fields,
  })) as ToolRecord[];
  console.log(`Successfully fetched ${tools.length} tools for drop ${drop.fields["Drop Number"]}.`);
} else {
  console.log(`No tools linked to drop ${drop.fields["Drop Number"]}.`);
}

return { drop, tools };
} catch (error) {
console.error(`Error fetching drop ${dropId} and its tools:`, error);
return { drop: null, tools: [] };
}
}

export default async function DropDetailPage({ params }: any) {
const { id } = params;
const { drop, tools } = await getDropDetails(id);

if (!drop) {
return (
  <div className="bg-charcoal text-white min-h-screen flex flex-col items-center justify-center p-8">
    <h1 className="text-3xl font-bold text-red-500 mb-4">Drop Not Found</h1>
    <p className="text-gray-400 text-center mb-6">The drop you are looking for does not exist or an error occurred.</p>
    <Link href="/" className="bg-accent-pink text-charcoal font-bold py-2 px-4 rounded-lg hover:bg-accent-pink/80 transition-colors">
      Go to Homepage
    </Link>
  </div>
);
}

const dropNumber = drop.fields["Drop Number"];
const dropDate = drop.fields["Drop Date"] ? new Date(drop.fields["Drop Date"]).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "N/A";

return (
<div className="bg-charcoal text-white min-h-screen">
  <Header />

  <main className="max-w-7xl mx-auto py-12 px-4">
    <div className="mb-8">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-accent-green transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Homepage
      </Link>
    </div>

    <h1 className="text-5xl font-bold text-white leading-tight text-balance mb-4">
      Drop #{dropNumber}
    </h1>
    <p className="text-xl text-gray-400 mb-12">
      Released on {dropDate}
    </p>

    <section className="py-8">
      <h2 className="text-3xl font-bold text-white mb-8">Tools in this Drop ({tools.length})</h2>
      <div className="flex flex-col gap-4"> {/* Changed from grid to flex col */}
        {tools.length > 0 ? tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tool/${tool.id}`}
            className="flex items-center gap-4 bg-charcoal-dark border border-gray-800 rounded-lg p-4 hover:shadow-lg hover:border-accent-pink transition-all duration-200"
          >
            <div className="w-12 h-12 relative flex-shrink-0">
              {tool.fields.Image && tool.fields.Image[0] ? (
                <Image
                  src={tool.fields.Image[0].url || "/placeholder.svg"}
                  alt={`${tool.fields.Name} icon`}
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center text-xl text-gray-400">
                  <FileText className="h-6 w-6" /> {/* Placeholder icon */}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{tool.fields.Name || "Unnamed Tool"}</h3>
              <p className="text-sm text-gray-400 line-clamp-1">{tool.fields.Tagline || tool.fields.Description || "No description available"}</p>
            </div>
            {tool.fields["Website URL"] && (
              <ExternalLink className="h-5 w-5 text-accent-pink flex-shrink-0" />
            )}
          </Link>
        )) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No tools available for this drop yet.</p>
            <Link href="/admin" className="text-accent-green hover:text-accent-pink transition-colors">
              Add some tools to get started →
            </Link>
          </div>
        )}
      </div>
    </section>
  </main>
</div>
);
}
