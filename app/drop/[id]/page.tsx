// app/drop/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { base, type DropRecord, type ToolRecord } from "@/lib/airtableClient";
import Header from '@/components/Header';
import { ArrowLeft, ExternalLink } from 'lucide-react';

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

export default async function DropDetailPage({ params }: { params: { id: string } }) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.length > 0 ? tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-charcoal-dark border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:border-accent-pink transition-all duration-200 flex flex-col"
              >
                <Link href={`/tool/${tool.id}`} className="aspect-video relative w-full">
                  {tool.fields.Image && tool.fields.Image[0] ? (
                    <Image
                      src={tool.fields.Image[0].url || "/placeholder.svg"}
                      alt={`${tool.fields.Name} screenshot`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                    <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">
                      {tool.fields.Category || "Tool"}
                    </span>
                    {tool.fields["Drop Date"] && (
                      <span>{new Date(tool.fields["Drop Date"]).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    )}
                  </div>
                  <Link href={`/tool/${tool.id}`} className="text-2xl font-bold text-white mb-2 hover:text-accent-pink transition-colors">{tool.fields.Name || "Unnamed Tool"}</Link>
                  <p className="text-gray-400 text-base line-clamp-3">{tool.fields.Tagline || tool.fields.Description || "No description available"}</p>
                  {tool.fields["Website URL"] && (
                    <a
                      href={tool.fields["Website URL"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-accent-pink hover:text-accent-green transition-colors text-sm font-semibold"
                    >
                      Visit Website <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
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
