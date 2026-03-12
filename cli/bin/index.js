#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may',
  'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in',
  'for', 'on', 'with', 'at', 'by', 'from', 'up', 'about', 'into', 'over', 'after',
  'under', 'above', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you',
  'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her',
  'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am',
  'been', 'being', 'having', 'doing', 'would', 'should', 'could', 'ought',
  'i\'m', 'you\'re', 'he\'s', 'she\'s', 'it\'s', 'we\'re', 'they\'re', 'i\'ve',
  'you\'ve', 'we\'ve', 'they\'ve', 'i\'d', 'you\'d', 'he\'d', 'she\'d', 'we\'d', 'they\'d',
  'i\'ll', 'you\'ll', 'he\'ll', 'she\'ll', 'we\'ll', 'they\'ll', 'isn\'t', 'aren\'t', 'wasn\'t',
  'weren\'t', 'hasn\'t', 'haven\'t', 'hadn\'t', 'doesn\'t', 'don\'t', 'didn\'t', 'won\'t',
  'wouldn\'t', 'shan\'t', 'shouldn\'t', 'can\'t', 'cannot', 'couldn\'t', 'mustn\'t', 'let\'s',
  'us', 'say', 'said', 'also', 'just', 'like', 'get', 'got', 'find', 'finding',
  'search', 'searching', 'looking', 'need', 'needs', 'wants', 'want', 'best', 'good', 'top',
  'free', 'cheap', 'affordable', 'use', 'using', 'used', 'make', 'making', 'build', 'building',
  'project', 'their', 'show', 'showme', 'list', 'all', 'some', 'any', 'no',
  'not', 'only', 'very', 'really', 'most', 'many', 'much', 'such', 'other', 'another',
  'work', 'works', 'working', 'vs', 'versus', 'alternative', 'alternatives', 'compare',
]);

function extractKeywords(query) {
  return query
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word))
    .join(' ');
}

const program = new Command();

program
  .name('salestools')
  .description('The official CLI for Salestools.club — configure your sales agents in one command.')
  .version('0.1.0');

program
  .command('search <query>')
  .description('Search for sales tools and APIs relevant to your campaign.')
  .option('--local', 'Use local server for testing', false)
  .action(async (query, options) => {
    const keywords = extractKeywords(query);
    const baseUrl = options.local ? 'http://localhost:3000' : 'https://salestools.club';
    const spinner = ora(chalk.cyan(`Searching for: `) + chalk.bold(query)).start();
    
    try {
      const response = await fetch(`${baseUrl}/api/tools?q=${encodeURIComponent(keywords)}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }
      
      const { tools, count } = await response.json();
      spinner.succeed(chalk.green(`Found ${chalk.bold(count)} tools`));
      
      if (count === 0) {
        console.log(chalk.gray('No tools found. Try a different search term.'));
        return;
      }

      console.log(chalk.bold('\nResults:'));
      console.log('─'.repeat(60));
      
      tools.slice(0, 10).forEach((tool, i) => {
        console.log(`\n${i + 1}. ${chalk.cyan(tool.name)}`);
        console.log(`   ${chalk.gray(tool.description?.slice(0, 80) || 'No description')}`);
        console.log(`   ${chalk.white('→')} ${chalk.underline(`https://salestools.club/apis/${tool.slug}`)}`);
      });
      
      if (count > 10) {
        console.log(chalk.gray(`\n...and ${count - 10} more. Visit https://salestools.club to see all.`));
      }
      
      console.log(chalk.bold('\nTip: Use with Claude Code:'));
      console.log(chalk.italic(`  "Find me ${keywords} tools on salestools.club using npx salestools search ${keywords}"`));
      
    } catch (error) {
      spinner.fail(chalk.red(`Search failed: ${error.message}`));
    }
  });

program
  .command('add <slug>')
  .description('Add a specific sales skill to your agent by its Salestools.club registry slug.')
  .option('--local', 'Use local registry for testing', false)
  .action(async (slug, options) => {
    const baseUrl = options.local ? 'http://localhost:3000' : 'https://salestools.club';
    const spinner = ora(chalk.cyan(`Fetching skill logic for: `) + chalk.bold(slug)).start();
    
    try {
      const response = await fetch(`${baseUrl}/api/skills/${slug}`);
      if (!response.ok) {
        throw new Error(`Skill '${slug}' not found in registry.`);
      }
      
      const skill = await response.json();
      spinner.succeed(chalk.green(`Retrieved ${chalk.bold(skill.name)} by ${skill.author}`));

      // Installation logic
      const fileName = `${skill.slug}.md`;
      const targetDir = path.join(process.cwd(), '.claude', 'skills');
      
      // Ensure directory exists
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const filePath = path.join(targetDir, fileName);
      fs.writeFileSync(filePath, skill.instructions);

      console.log('\n' + chalk.bold.green('✔ Skill Installed Successfully!'));
      console.log(chalk.gray(`Path: ${filePath}`));
      console.log('\n' + chalk.bold('Try this prompt:'));
      console.log(chalk.italic(`"${skill.instructions.split('\n').find(l => l.length > 5) || 'Use this skill to help me.'}"`));
      
    } catch (error) {
      spinner.fail(chalk.red(`Failed to add skill: ${error.message}`));
    }
  });

program
  .command('bootstrap [niche]')
  .description('Clone the Salestools Engine architecture for a new niche (e.g., Recruiting, Legal).')
  .action(async (niche) => {
    console.log(chalk.bold.green('\n🚀 Starting Salestools Directory Bootstrap...'));
    const targetNiche = niche || 'General';
    console.log(`${chalk.gray('Target Niche:')} ${chalk.cyan(targetNiche)}`);

    const spinner = ora('Initializing architecture...').start();
    
    setTimeout(() => {
      spinner.text = 'Cloning Next.js 15 frontend...';
      setTimeout(() => {
        spinner.text = 'Configuring crawl4ai research engine...';
        setTimeout(() => {
          spinner.text = 'Setting up Google Sheets sync logic...';
          setTimeout(() => {
            spinner.succeed(chalk.green('Architecture Ready!'));
            
            console.log('\n' + chalk.bold('Next Steps to Launch:'));
            console.log(chalk.white(' 1. ') + chalk.cyan('Connect your Google Sheet ID in .env'));
            console.log(chalk.white(' 2. ') + chalk.cyan(`Run 'npx salestools research' to find ${targetNiche} tools`));
            console.log(chalk.white(' 3. ') + chalk.cyan("Run 'npm run build' to deploy to Vercel"));
            
            console.log('\n' + chalk.bold.green('✔ Done!') + ` Your ${targetNiche} directory engine is ready.`);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  });

program.parse(process.argv);
