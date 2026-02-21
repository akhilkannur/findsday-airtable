import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Submit a Tool | Salestools Club",
  description:
    "Add a new sales API, SDK, or MCP server to the Salestools Club directory.",
  alternates: {
    canonical: "https://salestools.club/submit",
  },
}

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
