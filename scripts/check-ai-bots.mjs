import fetch from 'node-fetch';

const SITE_URL = 'https://salestools.club';
const USER_AGENTS = {
  'Claude': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +http://www.anthropic.com/claudebot)',
  'Perplexity': 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +http://www.perplexity.ai/bot.html)',
  'GPTBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)',
  'Googlebot': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Regular Browser': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

async function checkBot(name, ua) {
  console.log(`Checking ${name}...`);
  try {
    const res = await fetch(SITE_URL, {
      headers: {
        'User-Agent': ua
      }
    });
    console.log(`Status: ${res.status} ${res.statusText}`);
    if (res.status === 200) {
      console.log('✅ Success');
    } else {
      console.log('❌ Failed');
      if (res.status === 403) {
        console.log('Possible Cloudflare/WAF block.');
      }
    }
  } catch (err) {
    console.error(`Error checking ${name}:`, err.message);
  }
  console.log('---');
}

async function run() {
  for (const [name, ua] of Object.entries(USER_AGENTS)) {
    await checkBot(name, ua);
  }
}

run();
