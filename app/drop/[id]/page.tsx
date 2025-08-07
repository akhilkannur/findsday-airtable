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
const dropShortDescription = drop.fields["Short Description"] || "No description available for this drop.";

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
    <p className="text-xl text-gray-400 mb-2">
      Released on {dropDate}
    </p>
    <p className="text-lg text-gray-500 mb-12">
      {dropShortDescription}
    </p>

    <section className="py-8">
      <h2 className="text-3xl font-bold text-white mb-8">Tools in this Drop ({tools.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Changed back to grid for card layout */}
        {tools.length > 0 ? tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tool/${tool.id}`}
            className="relative bg-charcoal-dark border border-gray-800 rounded-xl overflow-hidden flex flex-col justify-end p-6 pb-8 min-h-[300px] hover:shadow-lg hover:border-accent-pink transition-all duration-200 group"
            style={{
              backgroundImage: tool.fields.Image && tool.fields.Image[0] ? `url(${tool.fields.Image[0].url})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/80 to-transparent rounded-xl"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-end">
              <span className="bg-gray-800 text-accent-green text-xs font-bold uppercase px-3 py-1 rounded-full self-start mb-2">
                {tool.fields.Category || "Tool"}
              </span>
              <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                {tool.fields.Name || "Unnamed Tool"}
              </h3>
              <p className="text-gray-400 text-base line-clamp-2 mb-4">
                {tool.fields.Tagline || tool.fields.Description || "No description available"}
              </p>
              {tool.fields["Website URL"] && (
                <div className="inline-flex items-center justify-center border border-gray-600 text-gray-300 px-4 py-2 rounded-full text-sm font-semibold group-hover:border-accent-pink group-hover:text-accent-pink transition-colors">
                  Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                </div>
              )}
            </div>
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
