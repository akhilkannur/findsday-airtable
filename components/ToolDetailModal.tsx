// components/ToolDetailModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ThumbsUp, ExternalLink } from 'lucide-react';

interface ToolDetailModalProps {
  toolId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ToolRecord {
  id: string;
  fields: {
    Name?: string;
    Category?: string;
    Tagline?: string;
    Description?: string;
    Image?: Array<{ url: string; filename: string; }>;
    "Website URL"?: string;
    "Drop Date"?: string;
    "Maker Name"?: string;
    "Maker Title"?: string;
    "Maker Quote"?: string;
    "Maker Photo"?: Array<{ url: string; filename: string; }>;
    "Maker Profile Link"?: string;
    [key: string]: any;
  };
}

export default function ToolDetailModal({ toolId, isOpen, onClose }: ToolDetailModalProps) {
  const [tool, setTool] = useState<ToolRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTool() {
      if (!toolId) {
        setTool(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/tool/${toolId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setTool(data.tool);
        } else {
          setError(data.message || 'Failed to fetch tool details.');
        }
      } catch (e: any) {
        setError(`Error fetching tool: ${e.message}`);
        console.error("Error fetching tool details:", e);
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      fetchTool();
    }
  }, [toolId, isOpen]);

  if (!toolId || !isOpen) {
    return null;
  }

  const f = tool?.fields;
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto bg-charcoal-dark text-white border-gray-800 p-0">
        {loading ? (
          <div className="flex items-center justify-center h-full p-8">
            <p className="text-gray-400">Loading tool details...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full p-8 text-red-400">
            <p>{error}</p>
          </div>
        ) : !tool ? (
          <div className="flex items-center justify-center h-full p-8 text-gray-400">
            <p>Tool not found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Main Content Area */}
            <div className="lg:col-span-2 p-8 space-y-8 border-r border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-4xl font-bold text-white leading-tight text-balance">
                  {name}
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-400 mt-2">
                  {tagline}
                </DialogDescription>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4">
                  <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase text-accent-green">
                    {category || "Tool"}
                  </span>
                  <span>Launched: {dropDate}</span>
                </div>
              </DialogHeader>

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
            <div className="lg:col-span-1 p-8 bg-charcoal-light space-y-6">
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
        )}
      </DialogContent>
    </Dialog>
  );
}
