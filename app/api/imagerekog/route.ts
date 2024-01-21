import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-pro-vision"});

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const reqBody = await req.json();
    const { prompt, imageParts } = reqBody;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

}