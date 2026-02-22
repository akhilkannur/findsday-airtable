#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';

const program = new Command();

program
  .name('salestools')
  .description('The official CLI for Salestools.club — configure your sales agents in one command.')
  .version('0.1.0');

// Initial "Hello World" command
program
  .command('init')
  .description('Bootstrap your sales agent environment with official MCPs (Apollo, HubSpot, etc.).')
  .action(async () => {
    const spinner = ora('Scanning for AI configurations (Claude/Cursor)...').start();
    
    // In a real CLI, we would detect Mac/Windows paths here
    setTimeout(() => {
      spinner.succeed(chalk.green('Detected Claude Desktop!'));
      
      console.log('
' + chalk.bold('Preparing to install official sales nodes:'));
      console.log(chalk.cyan(' - [OFFICIAL] Apollo.io MCP Node'));
      console.log(chalk.cyan(' - [OFFICIAL] HubSpot CRM Node'));
      console.log(chalk.cyan(' - [COMMUNITY] LinkedIn Prospector Skill'));
      
      console.log('
' + chalk.yellow('Note: ') + 'This is a "Hello World" preview. Real installation would update your config.json here.');
      
      console.log('
' + chalk.bold.green('Salestools initialized!') + ' Your agent is now ready for prospecting.');
    }, 1500);
  });

program
  .command('add <slug>')
  .description('Add a specific sales skill to your agent by its Salestools.club registry slug.')
  .action((slug) => {
    console.log(chalk.bold(`
Fetching skill metadata for: `) + chalk.cyan(slug));
    console.log(chalk.gray(`Retrieving from registry at https://salestools.club/api/skills/${slug}...`));
    
    // This is where we would fetch the JSON from your Google Sheet (via the API)
    console.log('
' + chalk.green('✔ ') + `Ready to install ` + chalk.bold(slug));
    console.log(chalk.italic(`"Claude, use the ${slug} skill to help me find 10 leads at US-based startups."`));
  });

program.parse(process.argv);
