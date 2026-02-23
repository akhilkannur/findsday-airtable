import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO || 'akhilkannur/findsday-airtable';

    if (!githubToken) {
      console.error('Missing GITHUB_TOKEN');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const [owner, repoName] = repo.split('/');

    // Get current file content
    const filePath = 'newsletter.json';
    let emails: Array<{ email: string; timestamp: string }> = [];
    let sha: string | undefined;

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`, {
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        emails = JSON.parse(content);
        sha = data.sha;
      }
    } catch (e) {
      // File doesn't exist yet, that's ok
      console.log('newsletter.json does not exist yet, will create it');
    }

    // Add new email
    emails.push({
      email,
      timestamp: new Date().toISOString(),
    });

    // Commit updated file
    const commitResponse = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `chore: add newsletter email ${email}`,
        content: Buffer.from(JSON.stringify(emails, null, 2)).toString('base64'),
        ...(sha ? { sha } : {}),
      }),
    });

    if (!commitResponse.ok) {
      const errorData = await commitResponse.json();
      console.error('GitHub API error:', errorData);
      throw new Error(errorData.message || 'Failed to commit to GitHub');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving email:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
