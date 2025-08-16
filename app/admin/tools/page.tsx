// app/admin/tools/page.tsx
import { base } from "@/lib/airtableClient"
import Link from "next/link"

// Define a simplified type for our tool data
interface ToolRecord {
  id: string
  fields: {
    Name?: string
    Category?: string
    Tagline?: string
    Description?: string
    Image?: Array<{ url: string }>
    "Website URL"?: string
    "Drop Date"?: string;
    "Drop Number (Rollup)"?: number; // Added for the new Rollup field
    "Maker Name"?: string
    "Maker Title"?: string
    "Maker Quote"?: string
    "Maker Photo"?: Array<{ url: string }>
    "Maker Profile Link"?: string
    "Created At"?: string
    "Updated At"?: string
    Drop?: string[]; // This is the linked record field
    [key: string]: any
  }
}

// Fetch all tools from Airtable
async function getAllTools() {
  try {
    console.log("Fetching all tools from Airtable...")

    const toolRecords = await base("Tools")
      .select({
        // IMPORTANT: We are now sorting by the NEW Rollup field "Drop Number (Rollup)".
        // This field must be created in your Airtable "Tools" table as a Rollup field
        // that pulls the "Drop Number" from the linked "Drop" record.
        sort: [
          { field: "Drop Number (Rollup)", direction: "desc" }, // Use the new Rollup field
          { field: "Name", direction: "asc" },
        ],
      })
      .all()

    const tools = toolRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as ToolRecord[]

    console.log(`Successfully fetched ${tools.length} tools from Airtable`)
    return tools
  } catch (error) {
    console.error("Error fetching tools from Airtable:", error)
    return []
  }
}

export default async function ToolsManagement() {
  const tools = await getAllTools()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#A052DE]">Manage Tools</h1>
          <div className="flex items-center space-x-4">
            <a
              href="https://airtable.com/appgGYEPnBcA7THzz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
            >
              Open Airtable
            </a>
            <Link
              href="/admin"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Tools List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">All Tools ({tools.length})</h2>
            <div className="flex space-x-2">
              <a
                href="https://airtable.com/appgGYEPnBcA7THzz/tblTools"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#A052DE] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
              >
                Add New Tool in Airtable
              </a>
            </div>
          </div>

          {tools.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tool
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Maker
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tools.map((tool: ToolRecord) => (
                    <tr key={tool.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {tool.fields.Image && tool.fields.Image[0] ? (
                              <img
                                src={tool.fields.Image[0].url || "/placeholder.svg"}
                                alt={tool.fields.Name || "Tool"}
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{tool.fields.Name || "Unnamed Tool"}</div>
                            <div className="text-sm text-gray-500">{tool.fields.Tagline || "No tagline"}</div>
                            {tool.fields["Website URL"] && (
                              <a
                                href={tool.fields["Website URL"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#A052DE] hover:text-purple-700"
                              >
                                Visit Website →
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {tool.fields.Category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            {tool.fields["Maker Photo"] && tool.fields["Maker Photo"][0] ? (
                              <img
                                src={tool.fields["Maker Photo"][0].url || "/placeholder.svg"}
                                alt={tool.fields["Maker Name"] || "Maker"}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">👤</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {tool.fields["Maker Name"] || "Unknown Maker"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {tool.fields["Maker Title"] || ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <a
                            href={`https://airtable.com/appgGYEPnBcA7THzz/tblTools/viwTools/${tool.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#A052DE] hover:text-purple-700"
                          >
                            Edit
                          </a>
                          {tool.fields["Website URL"] && (
                            <a
                              href={tool.fields["Website URL"]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800"
                            >
                              Visit
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No tools found.</p>
              <a
                href="https://airtable.com/appgGYEPnBcA7THzz/tblTools"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#A052DE] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
              >
                Add Your First Tool
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
