import { NextResponse, NextRequest } from 'next/server';
import Replicate from 'replicate';
import { json } from 'stream/consumers';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export const GET = async () => {
    return NextResponse.json({ message: 'Hello, Next.js Version 13!' }, { status: 200 });
};

export const POST = async (request: NextRequest) => {
    
    // @ts-ignore
    const body = await request.json();

    const { name } = body;

    const prompt = name ? `Generate a image of the ${name} in software` : 'Generate a image of software engineering';

    const imageGeneration = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
            input: {
                prompt: prompt,
            }
        }
    );

    if (!imageGeneration) {
        return NextResponse.json({ message: 'Error generating image' }, { status: 500 })
    }

    // @ts-ignore
    const image = imageGeneration[0];
    // console.log(image);

    return NextResponse.json({ imageURl: image }, { status: 200 })
    // @ts-ignore
};
