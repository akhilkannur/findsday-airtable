// app/tool/[id]/page.tsx
import { base } from "@/lib/airtableClient"
import Image from "next/image"
import Link from "next/link"

export async function generateStaticParams() {
  const records = await base("Tools").select().all()
  return records.map((r) => ({ id: r.id }))
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function ToolPage({ params }: Props) {
  const { id } = await params
  const record = await base("Tools").find(id)
  const tool = record.fields

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <Link href="/" className="text-sm text-sales-green mb-4 inline-block">
        ← Back
      </Link>

      <h1 className="text-5xl font-black mb-4">{tool.Name}</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* image */}
        <div className="md:col-span-1">
          {tool.Image?.[0] ? (
            <Image
              src={tool.Image[0].url}
              alt={tool.Name as string}
              width={800}
              height={450}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              NO IMAGE
            </div>
          )}
        </div>

        {/* story */}
        <div className="md:col-span-2 space-y-4">
          <span className="inline-block bg-sales-green text-charcoal px-2 py-1 text-xs font-bold uppercase">
            {tool.Category}
          </span>
          <p className="text-lg leading-relaxed">{tool.Description}</p>

          {tool["Maker Name"] && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-bold text-lg mb-1">Maker Story</h3>
              <p className="text-sm italic">
                “{tool["Maker Quote"]}” — {tool["Maker Name"]}
              </p>
            </div>
          )}

          {tool["Website URL"] && (
            <a
              href={tool["Website URL"] as string}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-charcoal text-white px-6 py-3 rounded font-bold hover:bg-sales-green hover:text-charcoal transition"
            >
              Visit Tool →
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
