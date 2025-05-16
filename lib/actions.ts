"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(prompt: string): Promise<string> {
  if (!prompt.trim()) {
    throw new Error("Prompt is required");
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
    response_format: "url",
  });

  if (!response.data?.[0]?.url) {
    throw new Error("No image URL in response");
  }

  return response.data[0].url;
}