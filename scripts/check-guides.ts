import { getAllGuides, getToolsForGuide } from "../lib/guides"

const guides = getAllGuides()
console.log(`Found ${guides.length} guides:`)

guides.forEach(guide => {
  const tools = getToolsForGuide(guide)
  console.log(`- ${guide.title} (${guide.slug}): ${tools.length} tools`)
})
