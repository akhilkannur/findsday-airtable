#!/bin/bash
# Check all docsUrls from data.ts for HTTP status
# Outputs: STATUS_CODE URL (or FAIL URL for connection errors)

grep 'docsUrl:' lib/data.ts | grep -v '""' | sed 's/.*docsUrl: "//;s/".*//' | sort -u | while read url; do
  status=$(curl -o /dev/null -s -w "%{http_code}" -L --max-time 10 --connect-timeout 5 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" "$url" 2>/dev/null)
  if [ $? -ne 0 ] || [ "$status" = "000" ]; then
    echo "FAIL $url"
  else
    echo "$status $url"
  fi
done
