import { NextRequest } from 'next/server';
import { ContactEmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {

    const body = await request.json();

    const { name, email, message } = body;

    if (!name) {
        return Response.json({ error: 'Missing name' });
    }

    if (!email) {
        return Response.json({ error: 'Missing email' });

    }
    
    if (!message) {
        return Response.json({ error: 'Missing message' });
    }

    try {
        // @ts-ignore
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: process.env.PERSONAL_EMAIL as string,
            subject: 'your image is ready',
            react: ContactEmailTemplate({ name:name, email:email, message:message }),
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
