import csv
import subprocess
import concurrent.futures

def check_url(url):
    try:
        result = subprocess.run(
            ['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}', '-L', '--max-time', '5', url],
            capture_output=True, text=True
        )
        return url, result.stdout.strip()
    except:
        return url, "Error"

urls = []
with open('docs_urls.txt', 'r') as f:
    urls = [line.strip() for line in f if line.strip()]

print(f"Auditing {len(urls)} links...")
with open('broken_links.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['URL', 'Status'])
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future_to_url = {executor.submit(check_url, url): url for url in urls}
        for future in concurrent.futures.as_completed(future_to_url):
            url, status = future.result()
            if status == "404":
                writer.writerow([url, status])
                print(f"Found broken: {url}")

print("Audit complete.")
