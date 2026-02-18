import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url="https://hunter.io")
        print(f"Crawl successful! Content length: {len(result.markdown)}")
        print("First 200 chars of markdown:")
        print(result.markdown[:200])

if __name__ == "__main__":
    asyncio.run(main())
