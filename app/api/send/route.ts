import { EmailTemplate } from "@/components/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { imageURl, email } = reqBody;

  try {
    // @ts-ignore
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email as string,
      subject: "Your avatar is ready! 🌟🤩",
      react: EmailTemplate({ imageURl: imageURl }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
