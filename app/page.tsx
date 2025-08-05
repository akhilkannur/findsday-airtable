// app/page.tsx
import Header from "../components/Header";
import { base, type ToolRecord, type SponsorRecord, type MakerRecord } from "@/lib/airtableClient";

export const dynamic = "force-dynamic";

async function getHomePageData() {
  try {
    const dropsRecords = await base("Drops")
      .select({
        sort: [{ field: "Drop Number", direction: "desc" }],
        maxRecords: 1,
      })
      .firstPage();
    const latestDropNumber =
      dropsRecords.length > 0 && typeof dropsRecords[0].fields["Drop Number"] === "number"
        ? dropsRecords[0].fields["Drop Number"]
        : 1;

    const toolsRecords = await base("Tools")
      .select({
        filterByFormula: `{Drop Number} = ${latestDropNumber}`,
        sort: [{ field: "Name", direction: "asc" }],
      })
      .firstPage();
    const tools = toolsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as ToolRecord[];

    const sponsorsRecords = await base("Sponsors").select({ maxRecords: 2 }).firstPage();
    const sponsors = sponsorsRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as SponsorRecord[];

    const makersRecords = await base("Makers").select({ maxRecords: 5 }).firstPage();
    const makers = makersRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as MakerRecord[];

    return { tools, sponsors, makers, latestDropNumber };
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return { tools: [], sponsors: [], makers: [], latestDropNumber: 1 };
  }
}

export default async function Home() {
  const { tools, sponsors, makers, latestDropNumber } = await getHomePageData();

  return (
    <div className="bg-paper-white text-charcoal">
      <Header />

      {/* HERO */}
      <section className="py-32 px-4 bg-charcoal text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block bg-sales-green text-charcoal px-3 py-1 text-xs font-bold tracking-widest uppercase">
              Weekly Pipeline Multipliers
            </span>
            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              Five Fresh Sales Tools.<br />
              <span className="text-sales-green">Curated Every&nbsp;Thursday.</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-300">
              No fluff—just the software that actually moves revenue, tested and annotated by the makers themselves.
            </p>
            <form className="mt-8 max-w-sm space-y-3">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-transparent border-b border-gray-500 focus:border-sales-green outline-none py-2"
              />
              <button className="w-full bg-sales-green text-charcoal font-bold py-3 uppercase tracking-widest text-sm">
                Get the Drop
              </button>
            </form>
          </div>
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-64 h-64 border-4 border-sales-green flex items-center justify-center">
              <span className="text-8xl font-black text-sales-green">{latestDropNumber}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-sm font-bold uppercase tracking-widest text-sales-green">Drop #{latestDropNumber}</span>
            <h2 className="text-5xl font-black mt-2">This Week’s Selection</h2>
          </div>

          {tools.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => {
                const cardThemes = [
                  "bg-charcoal text-white",
                  "bg-gray-100 text-charcoal border border-gray-200",
                  "bg-sales-green text-charcoal",
                ];
                const theme = cardThemes[tool.id % cardThemes.length];
                return (
                  <div
                    key={tool.id}
                    className={`${theme} rounded-lg p-6 flex flex-col hover:scale-[1.02] transition-transform duration-200 cursor-pointer`}
                    onClick={() => window.open(`/tool/${tool.id}`, '_blank')}
                  >
                    {/* Large thumbnail */}
                    {(tool.fields as any).Image?.[0] ? (
                      <img
                        src={(tool.fields as any).Image[0].url}
                        alt={tool.fields.Name as string}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-sm font-bold">
                        NO IMAGE
                      </div>
                    )}

                    <h3 className="text-2xl font-black mb-2">{tool.fields.Name}</h3>
                    <span className="text-xs font-bold uppercase mb-2">{tool.fields.Category}</span>
                    <p className="text-sm flex-grow opacity-90">{tool.fields.Tagline}</p>
                    {tool.fields["Maker Quote"] && (
                      <blockquote className="text-xs italic opacity-80 mt-2">
                        “{tool.fields["Maker Quote"]}”
                      </blockquote>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">Next drop loading…</p>
          )}
        </div>
      </section>

      {/* MAKERS */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-12">The Makers</h2>
          {makers.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {makers.map((maker, idx) => {
                const cardThemes = ["bg-charcoal text-white", "bg-white text-charcoal border border-gray-200"];
                const theme = cardThemes[idx % 2];
                return (
                  <div
                    key={maker.id}
                    className={`${theme} rounded-lg p-6 flex flex-col aspect-[3/4] hover:scale-[1.02] transition-transform duration-200`}
                  >
                    {maker.fields.Photo?.[0] ? (
                      <img
                        src={maker.fields.Photo[0].url}
                        alt={maker.fields.Name}
                        className="w-20 h-20 object-cover rounded-full mb-4"
                      />
                    ) : (
                      <div className="w-20 h-20 border-2 border-current rounded-full mb-4 flex items-center justify-center text-xs font-bold">
                        M
                      </div>
                    )}
                    <h3 className="text-lg font-black">{maker.fields.Name}</h3>
                    <p className="text-sm leading-snug mt-2 opacity-80 flex-grow">
                      {maker.fields.Bio ? maker.fields.Bio.slice(0, 80) + "…" : ""}
                    </p>
                    {maker.fields["Profile Link"] && (
                      <a
                        href={maker.fields["Profile Link"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-xs font-bold uppercase underline-offset-4"
                      >
                        Profile →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">Makers loading…</p>
          )}
        </div>
      </section>

      {/* SPONSORS */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">Partners</h2>
          {sponsors.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {sponsors.map((sponsor, idx) => (
                <div
                  key={sponsor.id}
                  className={`rounded-lg p-10 flex flex-col justify-between aspect-[16/9] ${
                    idx % 2 === 0 ? "bg-charcoal text-white" : "bg-gray-100 text-charcoal border border-gray-200"
                  }`}
                >
                  <div>
                    {sponsor.fields.Logo?.[0] ? (
                      <img
                        src={sponsor.fields.Logo[0].url}
                        alt={sponsor.fields.Name}
                        className="h-12 object-contain mb-4"
                      />
                    ) : (
                      <div className="h-12 border-b-2 border-current flex items-center font-bold mb-4">LOGO</div>
                    )}
                    <h3 className="text-2xl font-black">{sponsor.fields.Name}</h3>
                    <p className="text-sm mt-2 opacity-80">{sponsor.fields.Blurb}</p>
                  </div>
                  {sponsor.fields["Website URL"] && (
                    <a
                      href={sponsor.fields["Website URL"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto text-xs font-bold uppercase underline-offset-4"
                    >
                      Visit Partner →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Partners loading…</p>
          )}
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">Archive</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((offset) => (
              <div
                key={offset}
                className="border border-gray-300 rounded-lg p-6 flex justify-between items-center cursor-pointer hover:bg-charcoal hover:text-white transition"
              >
                <span className="font-black tracking-wider">
                  DROP #{latestDropNumber - offset} —{" "}
                  {new Date(Date.now() - offset * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).toUpperCase()}
                </span>
                <span className="text-2xl font-black">↓</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal text-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-3xl font-black">FINDSDAY</h3>
            <p className="text-sm text-gray-400 mt-1">Curating revenue software. Every Thursday.</p>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-0">
            {["TW", "IG", "LI"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-12 h-12 border border-gray-500 flex items-center justify-center text-xs font-bold hover:bg-sales-green hover:text-charcoal transition"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
