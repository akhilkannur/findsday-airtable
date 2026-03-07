#!/bin/bash
# Check all docsUrls concurrently (20 at a time)

check_url() {
  local url="$1"
  status=$(curl -o /dev/null -s -w "%{http_code}" -L --max-time 12 --connect-timeout 6 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "$url" 2>/dev/null)
  if [ $? -ne 0 ] || [ "$status" = "000" ]; then
    echo "FAIL $url"
  else
    echo "$status $url"
  fi
}

export -f check_url

grep 'docsUrl:' lib/data.ts | grep -v '""' | sed 's/.*docsUrl: "//;s/".*//' | sort -u | xargs -P 20 -I {} bash -c 'check_url "$@"' _ {}
