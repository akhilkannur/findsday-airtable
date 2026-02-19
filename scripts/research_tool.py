import asyncio
import json
import sys
from crawl4ai import AsyncWebCrawler

async def extract_tool_info(url):
    print(f"Researching: {url}")
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url=url)
        # In a real scenario, we could use crawler.arun with extraction strategy
        # For now, we'll return the markdown and I will process it.
        return {
            "url": url,
            "markdown": result.markdown
        }

async def main():
    if len(sys.argv) < 2:
        print("Usage: python research_tool.py <url>")
        return

    url = sys.argv[1]
    info = await extract_tool_info(url)
    
    # Save the markdown to a temporary file for the LLM to read
    with open("research_result.md", "w") as f:
        f.write(info["markdown"])
    
    print(f"Research complete. Results saved to research_result.md")

if __name__ == "__main__":
    asyncio.run(main())
