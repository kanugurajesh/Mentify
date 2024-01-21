import { NextRequest } from 'next/server';
import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {

    const body = await request.json();

    const { email, imageURl } = body;

    if (!email) {
        return Response.json({ error: 'Missing email' });

    }
    if (!imageURl) {
        return Response.json({ error: 'Missing image' });
    }

    try {
        // @ts-ignore
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: process.env.PERSONAL_EMAIL as string,
            subject: 'your image is ready',
            react: EmailTemplate({ imageURl:imageURl, email: email }),
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
