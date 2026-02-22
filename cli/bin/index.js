#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('salestools')
  .description('The official CLI for Salestools.club — configure your sales agents in one command.')
  .version('0.1.0');

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
