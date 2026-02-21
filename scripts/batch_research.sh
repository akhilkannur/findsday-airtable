#!/bin/bash
input="remaining_urls.txt"
output="final_research_results.md"
log="batch_research.log"
count=0
echo "Starting batch research at $(date)" > "$log"
while IFS= read -r url || [ -n "$url" ]
do
  if [[ "$url" == http* ]]; then
    echo "[$count] Researching: $url" | tee -a "$log"
    timeout 120s .venv/bin/python3 scripts/research_tool.py "$url" >> "$log" 2>&1
    if [ $? -eq 0 ] && [ -f research_result.md ]; then
      echo "--- URL: $url ---" >> "$output"
      cat research_result.md >> "$output"
      echo -e "\n\n" >> "$output"
      echo "[$count] Success: $url" >> "$log"
    else
      echo "[$count] Failed or Timed Out: $url" >> "$log"
    fi
    count=$((count+1))
  fi
done < "$input"
echo "Batch research finished at $(date)" >> "$log"
