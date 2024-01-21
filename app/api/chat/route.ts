import { NextRequest, NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {

  // get prompt field from the request body
  const reqBody = await req.json();
  const { userPrompt } = reqBody;
  const prompt = "you are a mental health professional. you are talking to a patient who is suffering from depression. you want to help them feel better. so answer the following questions: " + userPrompt;
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig: { maxOutputTokens: 400 }});

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({
      text
    });
  } catch (error) {
    return NextResponse.json({
      text: "Unable to process the prompt. Please try again."
    });
  }
}