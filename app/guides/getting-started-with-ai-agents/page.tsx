import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Getting Started with AI Agents for Sales | Salestools Club",
  description:
    "Your first week building with Claude Code and sales APIs. A practical guide for founders and sales folks who want to automate without becoming developers.",
  alternates: {
    canonical: "https://salestools.club/guides/getting-started-with-ai-agents",
  },
}

export default function GettingStartedGuide() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-8 py-12 border-b border-ink">
        <div className="layout-container">
          <Link href="/guides" className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade hover:text-ink transition-colors mb-8">
            <ArrowLeft className="h-3 w-3" />
            Back to Guides
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            Getting Started with AI Agents for Sales
          </h1>
          <p className="max-w-2xl font-serif italic text-xl text-ink-fade leading-relaxed border-l-2 border-ink pl-6">
            Your first week building with Claude Code and sales APIs. No code required.
          </p>
          <div className="flex gap-6 mt-8 font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">
            <span>15 min read</span>
            <span>•</span>
            <span>Beginner</span>
            <span>•</span>
            <span>Updated Feb 2026</span>
          </div>
        </div>
      </section>

      <article className="py-16">
        <div className="layout-container max-w-3xl">
          <div className="prose prose-lg">
            <p className="text-[1rem] leading-relaxed mb-8">
              Look, I&apos;ll be honest — when I first heard about &quot;AI agents&quot; and &quot;MCP servers,&quot; I thought it was another one of those &quot;just wait 6 months&quot; things. Everyone was hyped, nobody had anything working.
            </p>

            <p className="text-[1rem] leading-relaxed mb-8">
              Then I actually tried it. And here&apos;s what surprised me: <strong className="font-bold">you don&apos;t need to be a developer to get real work done</strong>. You just need to know how to talk to the agent.
            </p>

            <p className="text-[1rem] leading-relaxed mb-12">
              This guide walks you through your first week. By the end, you&apos;ll have an AI agent that can actually do sales work — not just write emails, but <em className="italic">do things</em>: pull leads, enrich data, update your CRM, research prospects. The stuff you&apos;d normally spend hours on.
            </p>

            <hr className="border-ink/20 my-12" />

            <h2 className="font-serif text-3xl font-bold mb-6">What You&apos;re Actually Building</h2>
            
            <p className="text-[1rem] leading-relaxed mb-6">
              Before we dive in, let&apos;s be clear about what this guide covers — and what it doesn&apos;t.
            </p>

            <p className="text-[1rem] leading-relaxed mb-6">
              <strong className="font-bold">What this IS:</strong> A practical walkthrough for using Claude Code (or similar agentic tools) to automate sales workflows. You&apos;ll learn how to give the agent access to your sales tools and have it execute real tasks.
            </p>

            <p className="text-[1rem] leading-relaxed mb-6">
              <strong className="font-bold">What this IS NOT:</strong> A technical deep-dive into APIs, webhooks, or writing code. If you want to build custom integrations from scratch, that&apos;s a different guide. This is for people who want results this weekend.
            </p>

            <div className="bg-paper-dark/40 border border-ink/20 p-6 my-8">
              <h3 className="font-mono text-[0.75rem] uppercase tracking-widest mb-4">What You&apos;ll Have by End of Week 1</h3>
              <ul className="space-y-3 text-[1rem]">
                <li className="flex gap-3">
                  <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                  <span>Claude Code configured with your sales stack</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                  <span>Ability to pull and enrich leads on command</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                  <span>Automated prospect research workflows</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                  <span>CRM updates without manual data entry</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-3xl font-bold mb-6">The Three Things You Need to Understand</h2>

            <p className="text-[1rem] leading-relaxed mb-6">
              There&apos;s a lot of jargon thrown around — MCP, agents, skills, APIs. Here&apos;s what actually matters:
            </p>

            <h3 className="font-serif text-2xl font-bold mt-8 mb-4">1. The Agent (Claude Code)</h3>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Think of Claude Code as a really smart intern who&apos;s great at following instructions but has no access to your tools. It can write perfect emails, analyze data, and reason through problems — but it can&apos;t actually <em className="italic">do</em> anything in your sales stack... yet.
            </p>

            <p className="text-[1rem] leading-relaxed mb-4">
              You install it from <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink transition-colors">claude.ai/download</a>. Takes 5 minutes. It runs locally on your machine.
            </p>

            <h3 className="font-serif text-2xl font-bold mt-8 mb-4">2. The Connection (MCP Servers)</h3>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              MCP is the plumbing. It&apos;s what lets Claude Code talk to your CRM, your email tool, your lead database. Instead of building custom API integrations, you just... install the MCP server for that tool. Copy a config. Done.
            </p>

            <p className="text-[1rem] leading-relaxed mb-4">
              Think of it like this: APIs are the pipes, MCP is the standardized connector that makes the pipes plug in instantly.
            </p>

            <p className="text-[1rem] leading-relaxed mb-4">
              This site has a whole section for <Link href="/mcp" className="underline underline-offset-4 hover:text-ink transition-colors">MCP servers</Link>. Browse it when you&apos;re ready to connect specific tools.
            </p>

            <h3 className="font-serif text-2xl font-bold mt-8 mb-4">3. The Instructions (Skills)</h3>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Skills are pre-written instruction sets that teach the agent how to do specific sales tasks. Instead of explaining from scratch how to qualify a lead, you install a &quot;Lead Qualification&quot; skill and the agent already knows what to do.
            </p>

            <p className="text-[1rem] leading-relaxed mb-4">
              We have a collection of <Link href="/skills" className="underline underline-offset-4 hover:text-ink transition-colors">sales skills here</Link> — cold outreach, objection handling, prospect research, all of it.
            </p>

            <div className="bg-paper-dark/40 border border-ink/20 p-6 my-8">
              <p className="text-[1rem] italic text-ink-fade">
                <strong className="not-italic">Quick analogy:</strong> The agent is the brain. MCP servers are the hands. Skills are the muscle memory. You need all three to get actual work done.
              </p>
            </div>

            <h2 className="font-serif text-3xl font-bold mb-6">Day 1: Set Up Claude Code</h2>

            <p className="text-[1rem] leading-relaxed mb-6">
              Alright, let&apos;s build. First thing: get Claude Code running.
            </p>

            <h4 className="font-bold text-lg mb-3">Step 1: Download and Install</h4>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Go to <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink transition-colors">claude.ai/download</a> and install Claude Code. It&apos;s free to start, and you get a decent amount of usage before hitting limits.
            </p>

            <h4 className="font-bold text-lg mb-3">Step 2: Open a Project Folder</h4>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Claude Code works in the context of a folder. Create one somewhere:
            </p>

            <div className="bg-ink/5 border border-ink/10 p-4 my-4 font-mono text-[0.85rem]">
              <p className="text-ink-fade mb-2"># Create a folder for your sales workflows</p>
              <p>mkdir ~/sales-agent</p>
              <p>cd ~/sales-agent</p>
            </div>

            <p className="text-[1rem] leading-relaxed mb-4">
              Then open Claude Code in that folder. On Mac:
            </p>

            <div className="bg-ink/5 border border-ink/10 p-4 my-4 font-mono text-[0.85rem]">
              <p>claude</p>
            </div>

            <h4 className="font-bold text-lg mb-3">Step 3: Have Your First Conversation</h4>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Start simple. Try this prompt:
            </p>

            <div className="bg-paper-dark/40 border border-ink/20 p-6 my-6">
              <p className="text-[1rem] italic">
                &quot;I&apos;m building an AI assistant for sales workflows. I want to use it to research prospects, enrich lead data, and automate outreach. What&apos;s the best way to get started?&quot;
              </p>
            </div>

            <p className="text-[1rem] leading-relaxed mb-4">
              Claude will walk you through the setup. It&apos;s surprisingly helpful and will point you to the right MCP servers based on what tools you use.
            </p>

            <h2 className="font-serif text-3xl font-bold mb-6">Day 2-3: Connect Your First Tool</h2>

            <p className="text-[1rem] leading-relaxed mb-6">
              Don&apos;t try to connect everything at once. Pick <strong className="font-bold">one tool</strong> you use daily and start there.
            </p>

            <h4 className="font-bold text-lg mb-3">Good First Choices:</h4>
            
            <ul className="space-y-2 text-[1rem] mb-6">
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">•</span>
                <span><strong className="font-bold">Apollo</strong> — for lead data and enrichment</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">•</span>
                <span><strong className="font-bold">HubSpot</strong> — for CRM operations</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">•</span>
                <span><strong className="font-bold">Gmail/Outlook</strong> — for email sending</span>
              </li>
            </ul>

            <h4 className="font-bold text-lg mb-3">How to Connect:</h4>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Just ask Claude Code. Seriously. Say:
            </p>

            <div className="bg-paper-dark/40 border border-ink/20 p-6 my-6">
              <p className="text-[1rem] italic">
                &quot;Help me connect my Apollo account so you can search for leads and enrich contact data.&quot;
              </p>
            </div>

            <p className="text-[1rem] leading-relaxed mb-4">
              Claude will:
            </p>

            <ul className="space-y-2 text-[1rem] mb-6">
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                <span>Tell you which MCP server to install</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                <span>Walk you through getting your API key</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                <span>Generate the config file for you</span>
              </li>
            </ul>

            <p className="text-[1rem] leading-relaxed mb-4">
              For Apollo specifically, you&apos;ll need an API key from your account settings. Most tools have this in Settings → API or Settings → Integrations.
            </p>

            <div className="bg-amber-50 border border-amber-200 p-6 my-8">
              <p className="text-[1rem] mb-2">
                <strong className="font-bold">⚠️ Security note:</strong> Your API keys live in a local config file. Don&apos;t commit this to GitHub. Don&apos;t share it. Treat it like a password.
              </p>
            </div>

            <h4 className="font-bold text-lg mb-3">Test It:</h4>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Once connected, try a simple task:
            </p>

            <div className="bg-paper-dark/40 border border-ink/20 p-6 my-6">
              <p className="text-[1rem] italic">
                &quot;Search Apollo for VPs of Sales at SaaS companies in San Francisco with 50-200 employees. Show me 10 results.&quot;
              </p>
            </div>

            <p className="text-[1rem] leading-relaxed mb-4">
              If it works, you&apos;ve officially automated your first sales workflow. Celebrate. Then move to the next tool.
            </p>

            <h2 className="font-serif text-3xl font-bold mb-6">Day 4-5: Install Your First Skill</h2>

            <p className="text-[1rem] leading-relaxed mb-6">
              Now that your agent can access your tools, let&apos;s teach it how to actually <em className="italic">do</em> sales work.
            </p>

            <p className="text-[1rem] leading-relaxed mb-6">
              Skills live in <Link href="/skills" className="underline underline-offset-4 hover:text-ink transition-colors">our skills directory</Link>. Here are the best ones to start with:
            </p>

            <div className="space-y-6 my-8">
              <div className="border border-ink/20 p-6">
                <h4 className="font-bold text-lg mb-2">Cold Outreach</h4>
                <p className="text-[1rem] text-ink-fade mb-4">Writes personalized cold email sequences. Give it a prospect list and it generates emails that don&apos;t sound like templates.</p>
                <Link href="/skills/cold-outreach" className="font-mono text-[0.7rem] uppercase tracking-widest underline underline-offset-4 hover:text-ink transition-colors">View Skill →</Link>
              </div>

              <div className="border border-ink/20 p-6">
                <h4 className="font-bold text-lg mb-2">Person Analyzer</h4>
                <p className="text-[1rem] text-ink-fade mb-4">Researches prospects across LinkedIn, Twitter, Reddit. Builds a full profile before your calls. This one&apos;s scary good.</p>
                <Link href="/skills/anysite-person-analyzer" className="font-mono text-[0.7rem] uppercase tracking-widest underline underline-offset-4 hover:text-ink transition-colors">View Skill →</Link>
              </div>

              <div className="border border-ink/20 p-6">
                <h4 className="font-bold text-lg mb-2">Lead Generation</h4>
                <p className="text-[1rem] text-ink-fade mb-4">Finds and enriches leads from multiple sources. Outputs CSV ready for your CRM or outreach tool.</p>
                <Link href="/skills/anysite-lead-generation" className="font-mono text-[0.7rem] uppercase tracking-widest underline underline-offset-4 hover:text-ink transition-colors">View Skill →</Link>
              </div>
            </div>

            <h4 className="font-bold text-lg mb-3">How to Install:</h4>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Each skill has an install command. For the cold outreach skill, it&apos;s something like:
            </p>

            <div className="bg-ink/5 border border-ink/10 p-4 my-4 font-mono text-[0.85rem]">
              <p>npx playbooks add skill [skill-name]</p>
            </div>

            <p className="text-[1rem] leading-relaxed mb-4">
              The skill page shows the exact command. Copy it, run it in your terminal, and the skill installs into your Claude Code setup.
            </p>

            <h4 className="font-bold text-lg mb-3">How to Use:</h4>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Once installed, just ask. For cold outreach:
            </p>

            <div className="bg-paper-dark/40 border border-ink/20 p-6 my-6">
              <p className="text-[1rem] italic">
                &quot;Use the cold outreach skill to write a 4-email sequence for targeting VPs of Marketing at Series B SaaS companies. Our product helps them reduce CAC by 30%.&quot;
              </p>
            </div>

            <p className="text-[1rem] leading-relaxed mb-4">
              The agent knows the framework. It&apos;ll ask clarifying questions if needed, then generate the sequence.
            </p>

            <h2 className="font-serif text-3xl font-bold mb-6">Day 6-7: Build Your First Workflow</h2>

            <p className="text-[1rem] leading-relaxed mb-6">
              Now let&apos;s combine everything. A &quot;workflow&quot; is just a sequence of tasks the agent does end-to-end.
            </p>

            <h4 className="font-bold text-lg mb-3">Example: Prospect Research Workflow</h4>
            
            <p className="text-[1rem] leading-relaxed mb-4">
              Here&apos;s what a real workflow looks like:
            </p>

            <ol className="space-y-4 text-[1rem] mb-6 list-decimal list-inside">
              <li className="leading-relaxed"><strong className="font-bold">Pull target accounts</strong> from your CRM or a CSV</li>
              <li className="leading-relaxed"><strong className="font-bold">Find decision-makers</strong> at each company using Apollo or LinkedIn</li>
              <li className="leading-relaxed"><strong className="font-bold">Research each person</strong> using the Person Analyzer skill</li>
              <li className="leading-relaxed"><strong className="font-bold">Score them</strong> based on fit signals (role, company size, recent activity)</li>
              <li className="leading-relaxed"><strong className="font-bold">Generate personalized outreach</strong> using the Cold Outreach skill</li>
              <li className="leading-relaxed"><strong className="font-bold">Export to CSV</strong> or push directly to your outreach tool</li>
            </ol>

            <p className="text-[1rem] leading-relaxed mb-4">
              You&apos;d prompt it like this:
            </p>

            <div className="bg-paper-dark/40 border border-ink/20 p-6 my-6">
              <p className="text-[1rem] italic">
                &quot;I have a list of 50 companies in this CSV. For each one, find the VP of Sales, research their background and recent activity, score them based on fit, and write a personalized first-line for a cold email. Output everything to a CSV with columns: Company, Name, Title, LinkedIn, Score, Personalization Hook.&quot;
              </p>
            </div>

            <p className="text-[1rem] leading-relaxed mb-4">
              This would&apos;ve taken you 10+ hours manually. The agent does it in 20 minutes.
            </p>

            <div className="bg-amber-50 border border-amber-200 p-6 my-8">
              <p className="text-[1rem] mb-2">
                <strong className="font-bold">Pro tip:</strong> Start with a small batch first. Run the workflow on 5 companies. Check the output. Tweak your instructions. Then scale to 50 or 500.
              </p>
            </div>

            <h2 className="font-serif text-3xl font-bold mb-6">What to Do When It Breaks</h2>

            <p className="text-[1rem] leading-relaxed mb-6">
              Because it will. Here&apos;s what usually goes wrong and how to fix it:
            </p>

            <h4 className="font-bold text-lg mb-3">&quot;The agent can&apos;t connect to my tool&quot;</h4>
            <p className="text-[1rem] leading-relaxed mb-4">
              Usually means your API key expired or the MCP server config is wrong. Re-check the config file (Claude can open it for you). Regenerate your API key if needed.
            </p>

            <h4 className="font-bold text-lg mb-3">&quot;It&apos;s not doing what I asked&quot;</h4>
            <p className="text-[1rem] leading-relaxed mb-4">
              Your prompt is probably too vague. Be specific about the output format, the criteria, the constraints. The agent is smart but it&apos;s not psychic.
            </p>

            <h4 className="font-bold text-lg mb-3">&quot;It&apos;s making mistakes on the data&quot;</h4>
            <p className="text-[1rem] leading-relaxed mb-4">
              Agents can hallucinate. Always verify critical data. Ask the agent to cite its sources or show its work. For important workflows, add a &quot;review step&quot; where it flags uncertain results for your review.
            </p>

            <h2 className="font-serif text-3xl font-bold mb-6">Where to Go From Here</h2>

            <p className="text-[1rem] leading-relaxed mb-6">
              You&apos;ve got the basics. Now it&apos;s about depth. Here&apos;s what I&apos;d do next:
            </p>

            <ul className="space-y-3 text-[1rem] mb-8">
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                <span><Link href="/tools" className="underline underline-offset-4 hover:text-ink transition-colors">Browse the API directory</Link> — find tools for your specific stack</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                <span><Link href="/mcp" className="underline underline-offset-4 hover:text-ink transition-colors">Check MCP servers</Link> — see what&apos;s available for your tools</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                <span><Link href="/skills" className="underline underline-offset-4 hover:text-ink transition-colors">Install more skills</Link> — objection handling, pricing strategy, offer creation</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-[0.7rem] text-ink-fade">→</span>
                <span>Join the <a href="https://discord.gg/claude-code" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink transition-colors">Claude Code Discord</a> — see what others are building</span>
              </li>
            </ul>

            <hr className="border-ink/20 my-12" />

            <div className="bg-paper-dark/40 border border-ink/20 p-8">
              <h3 className="font-serif text-2xl font-bold mb-4">One Last Thing</h3>
              <p className="text-[1rem] leading-relaxed mb-4">
                The people winning with this stuff aren&apos;t the ones with the best prompts or the most tools. They&apos;re the ones who <strong className="font-bold">actually ship workflows</strong>.
              </p>
              <p className="text-[1rem] leading-relaxed mb-4">
                Don&apos;t spend weeks optimizing. Build something ugly this weekend. Use it Monday. Fix it Tuesday. Iterate.
              </p>
              <p className="text-[1rem] leading-relaxed">
                In 30 days you&apos;ll have a sales machine that runs while you sleep. In 90 days you&apos;ll wonder how you ever did this manually.
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className="py-16 border-t border-ink">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/tools" className="group flex flex-col gap-4 p-6 border border-ink/20 hover:border-ink transition-colors">
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">Explore</span>
              <h3 className="text-xl font-bold uppercase group-hover:underline underline-offset-4">Sales APIs</h3>
              <p className="text-[1rem] text-ink-fade">Find tools to connect to your agent</p>
            </Link>
            <Link href="/mcp" className="group flex flex-col gap-4 p-6 border border-ink/20 hover:border-ink transition-colors">
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">Connect</span>
              <h3 className="text-xl font-bold uppercase group-hover:underline underline-offset-4">MCP Servers</h3>
              <p className="text-[1rem] text-ink-fade">Pre-built connectors for your stack</p>
            </Link>
            <Link href="/skills" className="group flex flex-col gap-4 p-6 border border-ink/20 hover:border-ink transition-colors">
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-fade">Learn</span>
              <h3 className="text-xl font-bold uppercase group-hover:underline underline-offset-4">Agent Skills</h3>
              <p className="text-[1rem] text-ink-fade">Pre-configured sales workflows</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
