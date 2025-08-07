// app/page.tsx - Full homepage with Airtable integration
'use client'; // This page now needs client-side interactivity for the modal

import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
// Removed ToolDetailModal import
import { base, type ToolRecord, type SponsorRecord, type MakerRecord, type DropRecord, getFeaturedDropAndArchivedDrops } from "@/lib/airtableClient";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from 'lucide-react'; // For the direct link icon

export default function Home() {
  const [pageData, setPageData] = useState<{
    featuredDrop: DropRecord | null;
    featuredTools: ToolRecord[];
    archivedDrops: DropRecord[];
    sponsors: SponsorRecord[];
    makers: MakerRecord[];
  } | null>(null);
  const [loadingPageData, setLoadingPageData] = useState(true);
  const [pageDataError, setPageDataError] = useState<string | null>(null);

  // Removed selectedToolId and isModalOpen states

  useEffect(() => {
    async function fetchHomePageData() {
      setLoadingPageData(true);
      setPageDataError(null);
      try {
        const response = await fetch('/api/homepage');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setPageData(data.data);
        } else {
          setPageDataError(data.message || 'Failed to load homepage data.');
        }
      } catch (e: any) {
        setPageDataError(`Error loading homepage data: ${e.message}`);
        console.error("Error loading homepage data:", e);
      } finally {
        setLoadingPageData(false);
      }
    }
    fetchHomePageData();
  }, []);

  // Removed handleToolCardClick and handleModalClose functions

  const heroGraphicUrl = "/placeholder.svg?height=400&width=400";
  const footerGraphicUrl = "/placeholder.svg?height=40&width=40";

  if (loadingPageData) {
    return (
      <div className="bg-charcoal text-white min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-400">Loading Findsday...</p>
      </div>
    );
  }

  if (pageDataError || !pageData) {
    return (
      <div className="bg-charcoal text-white min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error Loading Content</h1>
        <p className="text-gray-400 text-center mb-6">{pageDataError || "Failed to load homepage data. Please check your Airtable connection and environment variables."}</p>
        <Link href="/admin" className="bg-accent-pink text-charcoal font-bold py-2 px-4 rounded-lg hover:bg-accent-pink/80 transition-colors">
          Go to Admin Dashboard
        </Link>
      </div>
    );
  }

  const { featuredDrop, featuredTools, archivedDrops, sponsors, makers } = pageData;

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-balance">
              The Hottest Tool Drops.<br />
              Every Thursday.
            </h1>
            <p className="max-w-xl text-lg text-gray-400">
              Deep dives on the tools and workflows used in sales and product work. Insider leaks. Early access to news. Data-backed forecasts on where the industry is going and what&apos;s worth your attention.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>JOIN 100K+ READERS FROM</span>
              <div className="flex space-x-2">
                <Image src="/placeholder.svg?height=20&width=20" alt="Salesforce" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="HubSpot" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Stripe" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Notion" width={20} height={20} />
                <Image src="/placeholder.svg?height=20&width=20" alt="Figma" width={20} height={20} />
              </div>
            </div>
            <form className="mt-8 max-w-sm space-y-3">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-transparent border-b border-gray-600 focus:border-accent-pink outline-none py-2 text-white placeholder-gray-500"
              />
              <button className="w-full bg-accent-pink text-charcoal font-bold py-3 uppercase tracking-widest text-sm hover:bg-accent-pink/80 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <Image src={heroGraphicUrl || "/placeholder.svg"} alt="Abstract tech graphic" width={400} height={400} className="object-contain" />
          </div>
        </div>
      </section>

      {/* FEATURED DROP */}
      <section className="py-24 px-4 bg-charcoal-light border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">
              {featuredDrop ? `Drop #${featuredDrop.fields["Drop Number"]} - ${new Date(featuredDrop.fields["Drop Date"] || '').toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}` : "No Featured Drop This Week"}
            </h2>
            <Link href="/admin/tools" className="text-gray-400 hover:text-accent-green transition-colors">
              View All Tools →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTools.length > 0 ? featuredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-charcoal-dark border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:border-accent-pink transition-all duration-200 flex flex-col"
              >
                {/* Changed div to Link for navigation */}
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
                  {/* Changed h3 to Link for navigation */}
                  <Link href={`/tool/${tool.id}`} className="text-2xl font-bold text-white mb-2 hover:text-accent-pink transition-colors">{tool.fields.Name || "Unnamed Tool"}</Link>
                  <p className="text-gray-400 text-base line-clamp-3">{tool.fields.Tagline || tool.fields.Description || "No description available"}</p>
                  {tool.fields["Website URL"] && (
                    <a
                      href={tool.fields["Website URL"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-accent-pink hover:text-accent-green transition-colors text-sm font-semibold"
                      // Removed onClick={(e) => e.stopPropagation()} as it's no longer needed
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
        </div>
      </section>

      {/* MAKERS */}
      <section className="py-24 px-4 bg-charcoal-light border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">Meet the Makers</h2>
            <Link href="/admin" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {makers.length > 0 ? makers.map((maker) => (
              <div
                key={maker.id}
                className="bg-charcoal-dark border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:border-accent-pink transition-all duration-200"
              >
                <div className="w-28 h-28 relative mb-4">
                  {maker.fields.Photo && maker.fields.Photo[0] ? (
                    <Image
                      src={maker.fields.Photo[0].url || "/placeholder.svg"}
                      alt={`${maker.fields.Name}'s profile photo`}
                      fill
                      className="object-cover rounded-full border-4 border-accent-green shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 rounded-full border-4 border-accent-green flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{maker.fields.Name || "Unknown Maker"}</h3>
                <p className="text-base text-gray-400 mb-2">{maker.fields["Maker Title"] || "Maker"}</p>
                {maker.fields["Maker Quote"] && (
                  <blockquote className="text-lg italic text-gray-500 mt-2 line-clamp-3">
                    "{maker.fields["Maker Quote"]}"
                  </blockquote>
                )}
              </div>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No makers featured yet.</p>
              </div>
            )}
          </div>

          {/* Testimonials */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-charcoal-dark border border-gray-800 p-6 rounded-lg shadow-md hover:border-accent-green transition-colors">
              <p className="text-lg italic text-gray-300">
                "One of the only sales newsletters I open and read every single time 💯"
              </p>
              <p className="text-sm font-bold text-gray-400 mt-4">MICHAEL RIDDERING</p>
              <p className="text-xs text-gray-500">FOUNDER @ INFLIGHT</p>
            </div>
            <div className="bg-charcoal-dark border border-gray-800 p-6 rounded-lg shadow-md hover:border-accent-green transition-colors">
              <p className="text-lg italic text-gray-300">
                "I always look forward to a Findsday newsletter."
              </p>
              <p className="text-sm font-bold text-gray-400 mt-4">ANDREW HOGAN</p>
              <p className="text-xs text-gray-500">HEAD OF INSIGHTS @ FIGMA</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="py-24 px-4 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">Our Valued Sponsors</h2>
            <Link href="/admin" className="text-gray-400 hover:text-accent-green transition-colors">
              Manage →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sponsors.length > 0 ? sponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.fields["Website URL"] || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-charcoal-dark border border-gray-800 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:shadow-lg hover:border-accent-pink transition-all duration-200"
              >
                <div className="w-28 h-28 relative flex-shrink-0">
                  {sponsor.fields.Logo && sponsor.fields.Logo[0] ? (
                    <Image
                      src={sponsor.fields.Logo[0].url || "/placeholder.svg"}
                      alt={`${sponsor.fields.Name} logo`}
                      fill
                      className="object-contain p-2 bg-gray-900 rounded-lg border border-gray-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Logo</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{sponsor.fields.Name || "Sponsor"}</h3>
                  <p className="text-gray-400 text-base line-clamp-3">{sponsor.fields.Blurb || "Supporting the Findsday community"}</p>
                </div>
              </a>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No sponsors yet.</p>
                <Link href="/admin" className="text-accent-green hover:text-accent-pink transition-colors">
                  Add sponsors →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="py-24 px-4 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">Archive</h2>
            <Link href="/admin/tools" className="text-gray-400 hover:text-accent-green transition-colors">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {archivedDrops.length > 0 ? archivedDrops.map((drop) => (
              <div
                key={drop.id}
                className="border border-gray-800 rounded-lg p-6 flex justify-between items-center cursor-pointer hover:bg-charcoal-dark transition"
              >
                <span className="font-bold tracking-wider text-gray-300">
                  DROP #{drop.fields["Drop Number"]} —{" "}
                  {new Date(drop.fields["Drop Date"] || '').toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).toUpperCase()}
                </span>
                <span className="text-2xl font-bold text-accent-green">→</span>
              </div>
            )) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No archived drops found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal-dark text-white py-16 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src={footerGraphicUrl || "/placeholder.svg"} alt="Findsday logo" width={40} height={40} />
              <span className="text-2xl font-bold">FINDSDAY</span>
            </div>
            <p className="text-sm text-gray-400">
              Industry intel. Tool breakdowns. Honest takes on what&apos;s working and what&apos;s just hype.
            </p>
            <p className="text-xs text-gray-500">© 2017 - 2025 Findsday. All rights reserved.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-accent-green transition-colors">About</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Community</a></li>
            </ul>
            <ul className="space-y-2">
              <li><Link href="/admin" className="hover:text-accent-green transition-colors">Admin</Link></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Media Kit</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-4">
            <button className="border border-gray-600 text-gray-400 px-6 py-3 text-sm font-bold uppercase hover:bg-gray-800 hover:text-white transition-colors">
              Read Manifesto →
            </button>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-accent-green transition-colors">X/Twitter</a>
              <a href="#" className="hover:text-accent-green transition-colors">YouTube</a>
              <a href="#" className="hover:text-accent-green transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent-green transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent-green transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Removed Tool Detail Modal */}
    </div>
  );
}
