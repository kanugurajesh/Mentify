import { NextResponse, NextRequest } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export const GET = async () => {
    return NextResponse.json({ message: 'Hello, Next.js Version 13!' }, { status: 200 });
};

export const POST = async (request: NextRequest) => {
    
    // @ts-ignore
    const body = await request.json();

    const { email, gender, userPrompt, selectedFile } = body;

    const prompt = userPrompt ? userPrompt : `Generate a image of a ${gender}`;

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

    const SwapImage = await replicate.run(
        "yan-ops/face_swap:d5900f9ebed33e7ae08a07f17e0d98b4ebc68ab9528a70462afc3899cfe23bab",
        {
            input: {
                weight: 0.5,
                cache_days: 10,
                det_thresh: 0.1,
                request_id: "aa6a2aad-90ec-4c00-b90b-89f4d62e6b84",
                source_image: selectedFile,
                target_image: image,
            }
        }
    );

    if (!SwapImage) {
        return NextResponse.json({ message: 'Error generating image' }, { status: 500 })
    }

    // @ts-ignore
    const swapppedImage = SwapImage.image;

    // console.log(swapppedImage);

    return NextResponse.json({ imageURl: swapppedImage }, { status: 200 })
};
