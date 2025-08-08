import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { base, type DropRecord, type ToolRecord } from "@/lib/airtableClient";
import Header from '@/components/Header';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  try {
    // Find drop by slug
    const drops = await base("Drops").select({
      filterByFormula: `{Slug} = '${slug}'`
    }).firstPage();
    
    if (drops.length === 0) {
      return {
        title: 'Drop Not Found | Findsday',
        description: 'The requested drop could not be found.',
      };
    }
    
    const drop = drops[0];
    const dropNumber = drop.fields["Drop Number"];
    const dropDate = drop.fields["Drop Date"] ? new Date(drop.fields["Drop Date"]).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "N/A";
    const description = drop.fields["Short Description"] || `Discover the latest sales tools and productivity apps featured in Drop #${dropNumber} on ${dropDate}.`;
    
    return {
      title: `Drop #${dropNumber} - ${dropDate} | Weekly Sales Tools | Findsday`,
      description: description,
      keywords: ['sales tools', 'productivity apps', 'weekly drops', 'business tools', 'sales software'],
      openGraph: {
        title: `Drop #${dropNumber} - ${dropDate} | Findsday`,
        description: description,
        type: 'website',
        url: `https://findsday-airtable.vercel.app/drop/${slug}`,
        images: [
          {
            url: '/placeholder.svg',
            width: 1200,
            height: 630,
            alt: `Findsday Drop #${dropNumber}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Drop #${dropNumber} - ${dropDate} | Findsday`,
        description: description,
        images: ['/placeholder.svg'],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Drop | Findsday',
      description: 'Discover the latest sales tools and productivity apps.',
    };
  }
}

async function getDropDetails(slug: string): Promise<{ drop: DropRecord | null; tools: ToolRecord[] }> {
  try {
    console.log(`Fetching drop details for slug: ${slug}`);
    
    // Find drop by slug
    const drops = await base("Drops").select({
      filterByFormula: `{Slug} = '${slug}'`
    }).firstPage();
    
    if (drops.length === 0) {
      console.warn(`Drop with slug ${slug} not found.`);
      return { drop: null, tools: [] };
    }
    
    const dropRecord = drops[0];
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
    console.error(`Error fetching drop ${slug} and its tools:`, error);
    return { drop: null, tools: [] };
  }
}

export default async function DropDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { drop, tools } = await getDropDetails(slug);

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
  const dropSlug = drop.fields["Slug"] || slug;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Drop #${dropNumber} - ${dropDate}`,
    "description": dropShortDescription,
    "url": `https://findsday-airtable.vercel.app/drop/${dropSlug}`,
    "datePublished": drop.fields["Drop Date"],
    "hasPart": tools.map(tool => ({
      "@type": "SoftwareApplication",
      "name": tool.fields.Name,
      "description": tool.fields.Description || tool.fields.Tagline,
      "url": tool.fields["Website URL"],
      "applicationCategory": tool.fields.Category
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="bg-charcoal text-white min-h-screen">
        <Header />

        <main className="max-w-7xl mx-auto py-12 px-4">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-accent-green transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <Link href="/drops" className="hover:text-accent-green transition-colors">
                  Drops
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-white">Drop #{dropNumber}</span>
              </li>
            </ol>
          </nav>

          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-4">
              Drop #{dropNumber}
            </h1>
            <p className="text-xl text-gray-400 mb-2">
              Released on {dropDate}
            </p>
            <p className="text-lg text-gray-500 mb-6">
              {dropShortDescription}
            </p>
            
            {/* SEO-friendly meta information */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>📅 {dropDate}</span>
              <span>🛠️ {tools.length} tools featured</span>
              <span>📊 Weekly sales tools collection</span>
            </div>
          </header>

          <section className="py-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              Tools in this Drop ({tools.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {tools.length > 0 ? tools.map((tool) => {
                const toolSlug = tool.fields["Slug"] || tool.fields.Name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || tool.id;
                
                return (
                  <Link
                    key={tool.id}
                    href={`/sales-tool/${toolSlug}`}
                    className="relative bg-charcoal-dark border border-gray-800 rounded-xl overflow-hidden flex flex-col justify-end p-4 sm:p-6 pb-6 sm:pb-8 min-h-[250px] sm:min-h-[300px] hover:shadow-lg hover:border-accent-pink transition-all duration-200 group"
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
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                        {tool.fields.Name || "Unnamed Tool"}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base line-clamp-2 mb-4">
                        {tool.fields.Tagline || tool.fields.Description || "No description available"}
                      </p>
                      {tool.fields["Website URL"] && (
                        <div className="inline-flex items-center justify-center border border-gray-600 text-gray-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold group-hover:border-accent-pink group-hover:text-accent-pink transition-colors">
                          Visit Website <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                      )}
                    </div>
                  </Link>
                );
              }) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No tools available for this drop yet.</p>
                  <Link href="/admin" className="text-accent-green hover:text-accent-pink transition-colors">
                    Add some tools to get started →
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Related drops section for internal linking */}
          <section className="py-8 border-t border-gray-800 mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">More Weekly Drops</h2>
            <p className="text-gray-400 mb-6">
              Discover more sales tools and productivity apps from our weekly collections.
            </p>
            <Link 
              href="/drops" 
              className="inline-flex items-center bg-accent-pink text-charcoal font-bold py-3 px-6 rounded-lg hover:bg-accent-pink/80 transition-colors"
            >
              View All Drops <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Link>
          </section>
        </main>
      </div>
    </>
  );
} 