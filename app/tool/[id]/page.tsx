// app/tool/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { base, type ToolRecord } from "@/lib/airtableClient";
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ThumbsUp, ExternalLink, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header'; // Assuming Header is a client component or can be rendered here

interface ToolDetailPageProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic'; // Ensure this page is dynamic

async function getToolDetails(toolId: string): Promise<ToolRecord | null> {
  try {
    console.log(`Fetching tool details for page with ID: ${toolId}`);
    const record = await base("Tools").find(toolId);

    if (!record) {
      console.warn(`Tool with ID ${toolId} not found.`);
      return null;
    }

    const tool: ToolRecord = {
      id: record.id,
      fields: record.fields,
    };

    console.log(`Successfully fetched tool for page: ${tool.fields.Name}`);
    return tool;
  } catch (error) {
    console.error(`Error fetching tool ${toolId} for page:`, error);
    return null;
  }
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const tool = await getToolDetails(params.id);

  if (!tool) {
    return (
      <div className="bg-charcoal text-white min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Tool Not Found</h1>
        <p className="text-gray-400 text-center mb-6">The tool you are looking for does not exist or an error occurred.</p>
        <Link href="/" className="bg-accent-pink text-charcoal font-bold py-2 px-4 rounded-lg hover:bg-accent-pink/80 transition-colors">
          Go to Homepage
        </Link>
      </div>
    );
  }

  const f = tool.fields;
  const name = String(f?.Name ?? "Untitled Tool");
  const tagline = String(f?.Tagline ?? "");
  const description = String(f?.Description ?? "");
  const category = String(f?.Category ?? "");
  const website = String(f?.["Website URL"] ?? "");
  const images = f?.Image || [];
  const makerName = String(f?.["Maker Name"] ?? "");
  const makerTitle = String(f?.["Maker Title"] ?? "");
  const makerQuote = String(f?.["Maker Quote"] ?? "");
  const makerPhoto = f?.["Maker Photo"]?.[0]?.url;
  const makerProfileLink = String(f?.["Maker Profile Link"] ?? "");
  const dropDate = f?.["Drop Date"] ? new Date(f["Drop Date"]).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "N/A";

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header /> {/* Include the Header component */}

      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-accent-green transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Homepage
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-charcoal-dark border border-gray-800 rounded-lg p-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-5xl font-bold text-white leading-tight text-balance">
              {name}
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              {tagline}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4">
              <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">
                {category || "Tool"}
              </span>
              <span>Launched: {dropDate}</span>
            </div>

            {/* Product Images Carousel */}
            {images.length > 0 && (
              <div className="w-full">
                <Carousel className="w-full max-w-full mx-auto">
                  <CarouselContent>
                    {images.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-video relative w-full rounded-lg overflow-hidden border border-gray-700">
                          <Image
                            src={img.url || "/placeholder.svg"}
                            alt={`${name} screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </>
                  )}
                </Carousel>
              </div>
            )}

            {/* Description / Blog Content */}
            <div className="prose prose-invert max-w-none text-gray-300">
              <h3 className="text-2xl font-bold text-white mb-4">The Brief</h3>
              {/* Using dangerouslySetInnerHTML for rich text from Airtable */}
              <div dangerouslySetInnerHTML={{ __html: description || '<p class="text-gray-500">No detailed description available.</p>' }} />
            </div>

            {/* Maker Story */}
            {makerName && (
              <div className="mt-8 border-t border-gray-800 pt-8">
                <h3 className="text-2xl font-bold text-white mb-4">Meet the Maker</h3>
                <div className="flex items-center space-x-4 mb-4">
                  {makerPhoto ? (
                    <Image
                      src={makerPhoto || "/placeholder.svg"}
                      alt={`${makerName}'s photo`}
                      width={80}
                      height={80}
                      className="rounded-full object-cover border-2 border-accent-pink"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-3xl text-gray-400">
                      👤
                    </div>
                  )}
                  <div>
                    <p className="text-xl font-semibold text-white">{makerName}</p>
                    <p className="text-gray-400">{makerTitle}</p>
                  </div>
                </div>
                {makerQuote && (
                  <blockquote className="text-lg italic text-gray-500 border-l-4 border-accent-green pl-4">
                    "{makerQuote}"
                  </blockquote>
                )}
                {makerProfileLink && (
                  <Link
                    href={makerProfileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-accent-green hover:text-accent-pink transition-colors text-sm"
                  >
                    View Maker Profile <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 p-8 bg-charcoal-light rounded-lg space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Actions</h3>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center bg-accent-green text-charcoal font-bold py-3 px-4 rounded-lg hover:bg-accent-green/80 transition-colors text-center"
              >
                <ExternalLink className="mr-2 h-5 w-5" /> Visit Website
              </a>
            )}
            <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              <ThumbsUp className="mr-2 h-5 w-5" /> Upvote (Placeholder)
            </Button>

            <div className="border-t border-gray-800 pt-6 mt-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Tool Info</h3>
              <p className="text-gray-400">
                <span className="font-semibold text-white">Category:</span> {category || "N/A"}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-white">Launched:</span> {dropDate}
              </p>
              {/* Add more info as needed, e.g., pricing, integrations */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
