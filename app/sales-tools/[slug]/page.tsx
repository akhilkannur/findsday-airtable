// app/sales-tools/[slug]/page.tsx - SEO-friendly tool detail pages
import Image from "next/image"
import Link from "next/link"
import type { ToolRecord } from "@/lib/airtableClient"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ThumbsUp, ExternalLink, ArrowLeft } from "lucide-react"
import Header from "@/components/Header"
import { findToolBySlug, generateCanonicalUrl } from "@/lib/urlUtils"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

async function getToolDetails(slug: string): Promise<ToolRecord | null> {
  try {
    console.log(`[ToolPage] Attempting to fetch tool details for slug: ${slug}`)
    const tool = await findToolBySlug(slug, "Tools")

    if (!tool) {
      console.warn(`[ToolPage] Tool with slug ${slug} not found in Airtable.`)
      return null
    }

    console.log(`[ToolPage] Successfully fetched tool: ${tool.fields.Name} (ID: ${tool.id})`)
    return tool as ToolRecord
  } catch (error) {
    console.error(`[ToolPage] Error fetching tool ${slug}:`, error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await getToolDetails(slug)

  if (!tool) {
    return {
      title: "Tool Not Found | Findsday",
      description: "The sales tool you are looking for could not be found.",
    }
  }

  const toolName = tool.fields.Name || "Unnamed Tool"
  const description =
    tool.fields.Tagline ||
    tool.fields.Description ||
    `Discover ${toolName}, a powerful sales tool featured on Findsday.`
  const canonicalUrl = generateCanonicalUrl(`/sales-tools/${slug}`)

  return {
    title: `${toolName} - Sales Tool Review | Findsday`,
    description: description.substring(0, 160), // SEO-friendly description length
    keywords: `${toolName}, sales tools, ${tool.fields.Category || "sales software"}, CRM, lead generation`,
    openGraph: {
      title: `${toolName} - Sales Tool Review`,
      description: description,
      url: canonicalUrl,
      type: "article",
      images: tool.fields.Image?.[0]?.url
        ? [
            {
              url: tool.fields.Image[0].url,
              width: 1200,
              height: 630,
              alt: `${toolName} screenshot`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${toolName} - Sales Tool Review`,
      description: description,
      images: tool.fields.Image?.[0]?.url ? [tool.fields.Image[0].url] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  console.log(`[ToolPage] Rendering ToolDetailPage for slug: ${slug}`)

  const tool = await getToolDetails(slug)

  if (!tool) {
    console.log(`[ToolPage] Tool not found for slug ${slug}, rendering "Tool Not Found" message.`)
    return (
      <div className="bg-charcoal text-white min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Tool Not Found</h1>
        <p className="text-gray-400 text-center mb-6">
          The tool you are looking for does not exist or an error occurred.
        </p>
        <Link
          href="/"
          className="bg-accent-pink text-charcoal font-bold py-2 px-4 rounded-lg hover:bg-accent-pink/80 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    )
  }

  const f = tool.fields
  const name = String(f?.Name ?? "Untitled Tool")
  const tagline = String(f?.Tagline ?? "")
  const description = String(f?.Description ?? "")
  const category = String(f?.Category ?? "")
  const website = String(f?.["Website URL"] ?? "")
  const images = f?.Image || []
  const makerName = String(f?.["Maker Name"] ?? "")
  const makerTitle = String(f?.["Maker Title"] ?? "")
  const makerQuote = String(f?.["Maker Quote"] ?? "")
  const makerPhoto = f?.["Maker Photo"]?.[0]?.url
  const makerProfileLink = String(f?.["Maker Profile Link"] ?? "")

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-accent-green transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Homepage
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-charcoal-dark border border-gray-800 rounded-lg p-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-5xl font-bold text-white leading-tight text-balance">{name}</h1>
            <p className="text-xl text-gray-400 mt-2">{tagline}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4">
              <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">
                {category || "Tool"}
              </span>
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
              <div
                dangerouslySetInnerHTML={{
                  __html: description || '<p class="text-gray-500">No detailed description available.</p>',
                }}
              />
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
            <Button
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
            >
              <ThumbsUp className="mr-2 h-5 w-5" /> Upvote (Placeholder)
            </Button>

            <div className="border-t border-gray-800 pt-6 mt-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Tool Info</h3>
              <p className="text-gray-400">
                <span className="font-semibold text-white">Category:</span> {category || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
