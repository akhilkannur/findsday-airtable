import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { toolName, websiteUrl, apiDocsUrl, category, hasMcp, hasAgentSkills, description, email } = body;

    // Validate required fields
    if (!toolName || !websiteUrl || !category || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send submission notification email
    const { data, error } = await resend.emails.send({
      from: 'Salestools Club <onboarding@resend.dev>',
      to: 'akhil@salestools.club',
      subject: `New Tool Submission: ${toolName}`,
      html: `
        <h2>New Tool Submission</h2>
        <p><strong>Tool Name:</strong> ${toolName}</p>
        <p><strong>Website:</strong> <a href="${websiteUrl}">${websiteUrl}</a></p>
        <p><strong>API Docs:</strong> ${apiDocsUrl || 'Not provided'}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>MCP Ready:</strong> ${hasMcp ? 'Yes' : 'No'}</p>
        <p><strong>Agent Skills:</strong> ${hasAgentSkills ? 'Yes' : 'No'}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Submitter Email:</strong> ${email || 'Not provided'}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
