import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Submit a Tool | Salestools Club",
  description: "Submit your sales API, MCP server, or SDK to the Salestools Club directory.",
  alternates: {
    canonical: "https://salestools.club/submit",
  },
  openGraph: {
    title: "Submit a Tool | Salestools Club",
    description: "Submit your sales API, MCP server, or SDK to the Salestools Club directory.",
    type: "website",
    url: "https://salestools.club/submit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Submit a Tool | Salestools Club",
    description: "Submit your sales API, MCP server, or SDK to the Salestools Club directory.",
  },
}

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children
}
