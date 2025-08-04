// app/admin/page.tsx
import { base } from "@/lib/airtableClient"
import Link from "next/link"

// Define a simplified type for our tool data
interface ToolRecord {
  id: string
  fields: {
    Name?: string
    Category?: string
    Tagline?: string
    Image?: Array<{ url: string }>
    "Drop Number"?: number
    "Created At"?: string
    "Drop Date"?: string
    [key: string]: any
  }
}

// Fetch dashboard data from Airtable
async function getDashboardData() {
  try {
    console.log("Attempting to fetch data from Airtable for admin dashboard...")

    // Fetch subscriber count (if you decide to use Airtable for this later)
    let subscriberCount = 0
    try {
      const subscriberRecords = await base("Subscribers").select().all()
      subscriberCount = subscriberRecords.length
    } catch (error) {
      console.log("Subscribers table not accessible or doesn't exist, using 0")
    }

    // Fetch tool count
    const toolRecords = await base("Tools").select().all()
    const toolCount = toolRecords.length

    // Fetch latest 5 tools
    const latestToolRecords = await base("Tools")
      .select({
        sort: [{ field: "Created At", direction: "desc" }],
        maxRecords: 5,
      })
      .all()

    const latestTools = latestToolRecords.map((record) => ({
      id: record.id,
      fields: record.fields,
    })) as ToolRecord[]

    // Fetch sponsors count
    let sponsorCount = 0
    try {
      const sponsorRecords = await base("Sponsors").select().all()
      sponsorCount = sponsorRecords.length
    } catch (error) {
      console.log("Error fetching sponsors:", error)
    }

    // Fetch makers count
    let makerCount = 0
    try {
      const makerRecords = await base("Makers").select().all()
      makerCount = makerRecords.length
    } catch (error) {
      console.log("Error fetching makers:", error)
    }

    console.log("Successfully fetched data from Airtable for admin dashboard:", {
      subscriberCount,
      toolCount,
      sponsorCount,
      makerCount,
      latestTools: latestTools.length,
    })

    return {
      subscriberCount,
      toolCount,
      sponsorCount,
      makerCount,
      latestTools,
    }
  } catch (error) {
    console.error("Error fetching data from Airtable in getDashboardData:", error)
    return {
      subscriberCount: 0,
      toolCount: 0,
      sponsorCount: 0,
      makerCount: 0,
      latestTools: [],
    }
  }
}

export default async function AdminDashboard() {
  const { subscriberCount, toolCount, sponsorCount, makerCount, latestTools } = await getDashboardData()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#A052DE]">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <Link
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
            >
              View Site
            </Link>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tools</h3>
            <p className="text-3xl font-bold text-[#A052DE]">{toolCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Makers</h3>
            <p className="text-3xl font-bold text-[#A052DE]">{makerCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Sponsors</h3>
            <p className="text-3xl font-bold text-[#A052DE]">{sponsorCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Subscribers</h3>
            <p className="text-3xl font-bold text-[#A052DE]">{subscriberCount}</p>
            <p className="text-xs text-gray-500 mt-1">Use embedded forms</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <a
            href="https://airtable.com/appgGYEPnBcA7THzz/tblTools"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#A052DE] hover:bg-purple-700 text-white p-6 rounded-lg shadow-md text-center transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">Add New Tool</h3>
            <p className="text-purple-100">Create a new tool entry</p>
          </a>
          <Link
            href="/admin/tools"
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md text-center transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">Manage Tools</h3>
            <p className="text-blue-100">View and edit existing tools</p>
          </Link>
          <a
            href="https://airtable.com/appgGYEPnBcA7THzz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-md text-center transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">Open Airtable</h3>
            <p className="text-green-100">Manage data directly in Airtable</p>
          </a>
        </div>

        {/* Latest Tools */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Latest Tools</h2>
            <Link
              href="/admin/tools"
              className="bg-[#A052DE] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
            >
              View All Tools
            </Link>
          </div>

          {latestTools.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
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
                      Drop #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Added
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
                  {latestTools.map((tool: ToolRecord) => (
                    <tr key={tool.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {tool.fields.Image && tool.fields.Image[0] ? (
                              <img
                                src={tool.fields.Image[0].url || "/placeholder.svg"}
                                alt={tool.fields.Name || "Tool"}
                                className="w-10 h-10 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{tool.fields.Name || "Unnamed Tool"}</div>
                            <div className="text-sm text-gray-500">
                              {tool.fields.Tagline ? tool.fields.Tagline.substring(0, 30) + "..." : "No tagline"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tool.fields.Category || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{tool.fields["Drop Number"] || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tool.fields["Created At"]
                          ? new Date(tool.fields["Created At"]).toLocaleDateString()
                          : tool.fields["Drop Date"]
                            ? new Date(tool.fields["Drop Date"]).toLocaleDateString()
                            : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a
                          href={`https://airtable.com/appgGYEPnBcA7THzz/tblTools/${tool.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#A052DE] hover:text-purple-700 font-medium"
                        >
                          Edit in Airtable
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">
              No tools found yet.{" "}
              <a
                href="https://airtable.com/appgGYEPnBcA7THzz/tblTools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A052DE] hover:text-purple-700"
              >
                Add your first tool
              </a>
              .
            </p>
          )}
        </div>

        {/* Airtable Integration Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Airtable Integration</h3>
          <p className="text-blue-700 mb-4">
            Your site is now connected to Airtable! You can manage all your content directly in your Airtable base.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://airtable.com/appgGYEPnBcA7THzz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Open Airtable Base
            </a>
            <Link href="/api/test" className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
              Test Connection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
