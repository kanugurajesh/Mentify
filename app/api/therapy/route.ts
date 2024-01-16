import { NextRequest, NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const chat = model.startChat({
  history: [
    // you can write any conversation history here
    // {
    //   role: "user",
    //   parts: "Hello, can you answer my questions.",
    // },
    // {
    //   role: "model",
    //   parts: "Sure, what do you want to know?",
    // },
  ],
  generationConfig: {
    maxOutputTokens: 1000,
  },
});

export async function POST(req: NextRequest) {

  // get prompt field from the request body
  const reqBody = await req.json();

  // get the userPrompt from the request body
  const { userPrompt } = reqBody;

  const result = await chat.sendMessage(userPrompt);

  const response = await result.response;

  const text = response.text();

  if (text === "") {
    return NextResponse.json({
      text: "Sorry, I don't understand.",
    });
  }

  return NextResponse.json({
    text,
  });

}