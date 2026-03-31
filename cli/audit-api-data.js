#!/usr/bin/env node

/**
 * API Data Audit Script
 * 
 * Randomly samples tools from lib/data.ts and verifies their documentation
 * matches the declared metadata fields.
 * 
 * Usage:
 *   node cli/audit-api-data.js              # Check 5 random tools
 *   node cli/audit-api-data.js --count 10  # Check 10 random tools
 *   node cli/audit-api-data.js --verbose    # Show detailed output
 *   node cli/audit-api-data.js --report     # Generate JSON report
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Parse CLI args
const args = process.argv.slice(2);
const countArg = args.indexOf('--count');
const sampleCount = countArg !== -1 ? parseInt(args[countArg + 1]) || 5 : 5;
const verbose = args.includes('--verbose');
const reportMode = args.includes('--report');

// Import data
const dataPath = path.join(__dirname, '..', 'lib', 'data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Parse tools from data.ts
function parseTools(content) {
  const tools = [];
  const toolRegex = /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)"[^}]*docsUrl:\s*"([^"]*)"[^}]*apiType:\s*\[([^\]]*)\][^}]*authMethod:\s*\[([^\]]*)\][^}]*hasFreeTier:\s*(true|false)[^}]*\}/g;
  
  let match;
  while ((match = toolRegex.exec(content)) !== null) {
    tools.push({
      slug: match[1],
      name: match[2],
      docsUrl: match[3],
      apiType: match[4].split(',').map(s => s.trim().replace(/"/g, '')).filter(Boolean),
      authMethod: match[5].split(',').map(s => s.trim().replace(/"/g, '')).filter(Boolean),
      hasFreeTier: match[6] === 'true'
    });
  }
  return tools;
}

// Check if URL is reachable
function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url || url === '') {
      resolve({ status: 'NO_URL', ok: false });
      return;
    }
    
    const protocol = url.startsWith('https') ? https : http;
    const start = Date.now();
    
    const req = protocol.get(url, { timeout: 10000 }, (res) => {
      const duration = Date.now() - start;
      resolve({
        status: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 400,
        duration
      });
    });
    
    req.on('error', (err) => {
      resolve({ status: 'ERROR', ok: false, error: err.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 'TIMEOUT', ok: false });
    });
  });
}

// Fetch docs page and check for indicators
async function analyzeDocsPage(url) {
  const result = {
    hasGraphQL: false,
    hasREST: false,
    hasOAuth: false,
    hasAPIKey: false,
    hasBasicAuth: false,
    hasFreeTier: false,
    hasWebhooks: false,
    hasSDK: []
  };
  
  if (!url || url === '') return result;
  
  const protocol = url.startsWith('https') ? https : http;
  
  return new Promise((resolve) => {
    const req = protocol.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const content = data.toLowerCase();
        
        result.hasGraphQL = content.includes('graphql');
        result.hasREST = content.includes('rest api') || content.includes('restful');
        result.hasOAuth = content.includes('oauth') || content.includes('oauth2');
        result.hasAPIKey = content.includes('api key') || content.includes('apikey');
        result.hasBasicAuth = content.includes('basic auth');
        result.hasFreeTier = content.includes('free tier') || content.includes('free plan') || content.includes('free trial');
        result.hasWebhooks = content.includes('webhook');
        
        // Check for SDK mentions
        const sdks = ['.net', 'python', 'javascript', 'java', 'ruby', 'go', 'php', 'c#'];
        sdks.forEach(sdk => {
          if (content.includes(`${sdk} sdk`) || content.includes(`${sdk} library`)) {
            result.hasSDK.push(sdk);
          }
        });
        
        resolve(result);
      });
    });
    
    req.on('error', () => resolve(result));
    req.on('timeout', () => { req.destroy(); resolve(result); });
  });
}

// Random sampling
function sampleTools(tools, count) {
  const shuffled = [...tools].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, tools.length));
}

// Analyze a single tool
async function analyzeTool(tool) {
  const urlCheck = await checkUrl(tool.docsUrl);
  const pageAnalysis = await analyzeDocsPage(tool.docsUrl);
  
  return {
    ...tool,
    urlCheck,
    pageAnalysis
  };
}

// Check discrepancies
function checkDiscrepancies(tool) {
  const discrepancies = [];
  
  // Check API type
  if (pageAnalysis.hasGraphQL && !tool.apiType.includes('GraphQL')) {
    discrepancies.push({
      field: 'apiType',
      current: tool.apiType,
      expected: [...tool.apiType, 'GraphQL'],
      severity: 'medium',
      note: 'Docs mention GraphQL but not listed'
    });
  }
  
  // Check auth method
  if (pageAnalysis.hasOAuth && !tool.authMethod.includes('OAuth2')) {
    discrepancies.push({
      field: 'authMethod',
      current: tool.authMethod,
      expected: [...tool.authMethod, 'OAuth2'],
      severity: 'high',
      note: 'Docs mention OAuth but not listed'
    });
  }
  
  if (pageAnalysis.hasAPIKey && !tool.authMethod.some(m => m.includes('API Key'))) {
    discrepancies.push({
      field: 'authMethod',
      current: tool.authMethod,
      expected: [...tool.authMethod, 'API Key'],
      severity: 'high',
      note: 'Docs mention API Key but not listed'
    });
  }
  
  // Check free tier
  if (pageAnalysis.hasFreeTier && !tool.hasFreeTier) {
    discrepancies.push({
      field: 'hasFreeTier',
      current: false,
      expected: true,
      severity: 'medium',
      note: 'Docs mention free tier but marked as false'
    });
  }
  
  return discrepancies;
}

// Main function
async function main() {
  console.log('\n🔍 API Data Audit Script');
  console.log('========================\n');
  
  const tools = parseTools(dataContent);
  console.log(`Found ${tools.length} tools with docsUrl\n`);
  
  const sample = sampleTools(tools, sampleCount);
  console.log(`Sampling ${sample.length} random tools for audit...\n`);
  
  const results = [];
  
  for (const tool of sample) {
    if (verbose) console.log(`\n📋 Checking: ${tool.name} (${tool.slug})`);
    
    const analysis = await analyzeTool(tool);
    results.push(analysis);
    
    if (verbose) {
      console.log(`   URL: ${tool.docsUrl}`);
      console.log(`   Status: ${analysis.urlCheck.status} (${analysis.urlCheck.duration}ms)`);
      console.log(`   API Types found: ${analysis.pageAnalysis.hasREST ? 'REST ' : ''}${analysis.pageAnalysis.hasGraphQL ? 'GraphQL ' : ''}`);
      console.log(`   Auth found: ${analysis.pageAnalysis.hasOAuth ? 'OAuth ' : ''}${analysis.pageAnalysis.hasAPIKey ? 'API Key ' : ''}${analysis.pageAnalysis.hasBasicAuth ? 'Basic ' : ''}`);
      console.log(`   Free tier: ${analysis.pageAnalysis.hasFreeTier ? '✓' : '✗'}`);
      console.log(`   Webhooks: ${analysis.pageAnalysis.hasWebhooks ? '✓' : '✗'}`);
    }
  }
  
  // Report results
  console.log('\n\n📊 Audit Results');
  console.log('================\n');
  
  const working = results.filter(r => r.urlCheck.ok).length;
  const broken = results.filter(r => !r.urlCheck.ok).length;
  
  console.log(`URL Health: ${working}/${sample.length} accessible, ${broken} broken\n`);
  
  // List broken URLs
  if (broken > 0) {
    console.log('❌ Broken URLs:');
    results.filter(r => !r.urlCheck.ok).forEach(r => {
      console.log(`   - ${r.name}: ${r.docsUrl} (${r.urlCheck.status})`);
    });
    console.log('');
  }
  
  // Check for potential discrepancies
  console.log('⚠️  Potential Discrepancies:');
  let hasIssues = false;
  
  results.forEach(r => {
    const issues = [];
    
    if (r.pageAnalysis.hasGraphQL && !r.apiType.includes('GraphQL')) {
      issues.push('GraphQL not listed in apiType');
    }
    if (r.pageAnalysis.hasOAuth && !r.authMethod.includes('OAuth2')) {
      issues.push('OAuth not listed in authMethod');
    }
    if (r.pageAnalysis.hasAPIKey && !r.authMethod.some(m => m.includes('API Key'))) {
      issues.push('API Key not listed in authMethod');
    }
    if (r.pageAnalysis.hasFreeTier && !r.hasFreeTier) {
      issues.push('Free tier mentioned but hasFreeTier=false');
    }
    
    if (issues.length > 0) {
      hasIssues = true;
      console.log(`\n${r.name}:`);
      issues.forEach(i => console.log(`   - ${i}`));
    }
  });
  
  if (!hasIssues) {
    console.log('   No discrepancies found in sampled tools!');
  }
  
  // Generate report if requested
  if (reportMode) {
    const report = {
      timestamp: new Date().toISOString(),
      totalTools: tools.length,
      sampledCount: sample.length,
      summary: {
        workingUrls: working,
        brokenUrls: broken
      },
      results: results.map(r => ({
        slug: r.slug,
        name: r.name,
        docsUrl: r.docsUrl,
        urlStatus: r.urlCheck.status,
        analyzed: {
          hasREST: r.pageAnalysis.hasREST,
          hasGraphQL: r.pageAnalysis.hasGraphQL,
          hasOAuth: r.pageAnalysis.hasOAuth,
          hasAPIKey: r.pageAnalysis.hasAPIKey,
          hasFreeTier: r.pageAnalysis.hasFreeTier,
          hasWebhooks: r.pageAnalysis.hasWebhooks,
          sdks: r.pageAnalysis.hasSDK
        }
      }))
    };
    
    const reportPath = path.join(__dirname, 'audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Report saved to: ${reportPath}`);
  }
  
  console.log('\n');
}

// Run
main().catch(console.error);
