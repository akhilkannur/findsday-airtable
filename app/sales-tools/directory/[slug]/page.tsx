// app/sales-tools/directory/[slug]/page.tsx - SEO-friendly directory tool pages
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Star, Building, CheckCircle, XCircle, Zap } from "lucide-react"
import Header from "@/components/Header"
import { findToolBySlug, generateCanonicalUrl } from "@/lib/urlUtils"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

async function getDirectoryToolDetails(slug: string) {
  try {
    console.log(`[DirectoryToolPage] Attempting to fetch tool details for slug: ${slug}`)
    const tool = await findToolBySlug(slug, "Directory Tools")

    if (!tool) {
      console.warn(`[DirectoryToolPage] Tool with slug ${slug} not found in Airtable.`)
      return null
    }

    console.log(`[DirectoryToolPage] Successfully fetched tool: ${tool.fields.Name} (ID: ${tool.id})`)
    return tool
  } catch (error) {
    console.error(`[DirectoryToolPage] Error fetching tool ${slug}:`, error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await getDirectoryToolDetails(slug)

  if (!tool) {
    return {
      title: "Sales Tool Not Found | Findsday Directory",
      description: "The sales tool you are looking for could not be found in our directory.",
    }
  }

  const toolName = tool.fields.Name || "Unnamed Tool"
  const description =
    tool.fields["Short Description"] ||
    tool.fields.Description ||
    `Discover ${toolName}, a comprehensive sales tool in the Findsday directory.`
  const canonicalUrl = generateCanonicalUrl(`/sales-tools/directory/${slug}`)

  return {
    title: `${toolName} - Sales Tool Directory | Findsday`,
    description: description.substring(0, 160),
    keywords: `${toolName}, sales tools directory, ${tool.fields.Category || "sales software"}, CRM, lead generation, sales enablement`,
    openGraph: {
      title: `${toolName} - Sales Tool Directory`,
      description: description,
      url: canonicalUrl,
      type: "article",
      images: tool.fields.Logo?.[0]?.url
        ? [
            {
              url: tool.fields.Logo[0].url,
              width: 1200,
              height: 630,
              alt: `${toolName} logo`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${toolName} - Sales Tool Directory`,
      description: description,
      images: tool.fields.Logo?.[0]?.url ? [tool.fields.Logo[0].url] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function DirectoryToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  console.log(`[DirectoryToolPage] Rendering DirectoryToolDetailPage for slug: ${slug}`)

  const tool = await getDirectoryToolDetails(slug)

  if (!tool) {
    console.log(`[DirectoryToolPage] Tool not found for slug ${slug}, rendering "Tool Not Found" message.`)
    return (
      <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Tool Not Found</h1>
        <p className="text-gray-600 text-center mb-6">
          The tool you are looking for does not exist or an error occurred.
        </p>
        <Link
          href="/sales-tools/directory"
          className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Directory
        </Link>
      </div>
    )
  }

  const f = tool.fields
  const name = String(f?.Name ?? "Untitled Tool")
  const description = String(f?.Description ?? "")
  const shortDescription = String(f?.["Short Description"] ?? "")
  const category = String(f?.Category ?? "")
  const website = String(f?.["Website URL"] ?? "")
  const logo = f?.Logo?.[0]?.url
  const status = String(f?.Status ?? "")
  const pricingModel = String(f?.["Pricing Model"] ?? "")
  const startingPrice = String(f?.["Starting Price"] ?? "")
  const companyName = String(f?.["Company Name"] ?? "")
  const keyFeatures = String(f?.["Key Features"] ?? "")
  const useCases = String(f?.["Use Cases"] ?? "")
  const integrations = String(f?.Integrations ?? "")
  const pros = String(f?.Pros ?? "")
  const cons = String(f?.Cons ?? "")
  const userRating = f?.["User Rating"] ? Number(f["User Rating"]) : 0
  const reviewCount = f?.["Review Count"] ? Number(f["Review Count"]) : 0
  const dealAvailable = Boolean(f?.["Deal Available"])
  const dealDescription = String(f?.["Deal Description"] ?? "")
  const dealUrl = String(f?.["Deal URL"] ?? "")

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-8">
          <Link
            href="/sales-tools/directory"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start space-x-6">
              {logo && (
                <div className="flex-shrink-0">
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt={`${name} logo`}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover border border-gray-200"
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">{name}</h1>
                <p className="text-xl text-gray-600 mt-2">{shortDescription}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {category || "Tool"}
                  </span>
                  {status && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {status}
                    </span>
                  )}
                  {dealAvailable && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                      Deal Available
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Rating */}
            {userRating > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < userRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {userRating}/5 ({reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Description */}
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About {name}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: description || '<p class="text-gray-500">No detailed description available.</p>',
                }}
              />
            </div>

            {/* Key Features */}
            {keyFeatures && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="prose max-w-none text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: keyFeatures.replace(/\n/g, "<br>") }} />
                </div>
              </div>
            )}

            {/* Use Cases */}
            {useCases && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h3>
                <div className="prose max-w-none text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: useCases.replace(/\n/g, "<br>") }} />
                </div>
              </div>
            )}

            {/* Pros and Cons */}
            {(pros || cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pros && (
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Pros
                    </h3>
                    <div className="space-y-2">
                      {pros
                        .split("\n")
                        .filter(Boolean)
                        .map((pro, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{pro}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {cons && (
                  <div>
                    <h3 className="text-xl font-bold text-red-700 mb-3 flex items-center">
                      <XCircle className="w-5 h-5 mr-2" />
                      Cons
                    </h3>
                    <div className="space-y-2">
                      {cons
                        .split("\n")
                        .filter(Boolean)
                        .map((con, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{con}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Integrations */}
            {integrations && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {integrations.split(",").map((integration, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {integration.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 p-6 bg-gray-50 rounded-lg space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>

            {/* Deal Section */}
            {dealAvailable && dealUrl && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-red-800 mb-2">🔥 Special Deal</h4>
                {dealDescription && <p className="text-sm text-red-700 mb-3">{dealDescription}</p>}
                <a
                  href={dealUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Zap className="mr-2 h-5 w-5" /> Claim Deal
                </a>
              </div>
            )}

            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="mr-2 h-5 w-5" /> Visit Website
              </a>
            )}

            <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Tool Info</h3>

              {companyName && (
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900 flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Company:
                  </span>
                  {companyName}
                </p>
              )}

              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Category:</span> {category || "N/A"}
              </p>

              {pricingModel && (
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">Pricing:</span> {pricingModel}
                  {startingPrice && ` - ${startingPrice}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
