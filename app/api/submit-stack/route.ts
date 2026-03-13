import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, stackName, tool1, tool2, tool3, description } = body;

    // Validate required fields
    if (!name || !stackName || !tool1 || !tool2 || !tool3 || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send submission notification email
    const { data, error } = await resend.emails.send({
      from: 'Salestools Club <onboarding@resend.dev>',
      to: 'akhil@salestools.club',
      subject: `New Stack Submission: ${stackName}`,
      html: `
        <h2>New Stack Submission</h2>
        <p><strong>Submitter:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Stack Name:</strong> ${stackName}</p>
        <p><strong>Tool 1:</strong> ${tool1}</p>
        <p><strong>Tool 2:</strong> ${tool2}</p>
        <p><strong>Tool 3:</strong> ${tool3}</p>
        <p><strong>Description:</strong> ${description}</p>
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
