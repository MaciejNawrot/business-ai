"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ImageFormat = "1:1" | "16:9" | "4:5" | "9:16";

const formatToSize: Record<ImageFormat, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "16:9": { width: 1792, height: 1024 },
  "4:5": { width: 1024, height: 1280 },
  "9:16": { width: 1024, height: 1792 },
};

export async function generateImage(
  prompt: string,
  companyDescription: string,
  format: ImageFormat
): Promise<string> {
  if (!prompt.trim()) {
    throw new Error("Prompt is required");
  }

  if (!companyDescription.trim()) {
    throw new Error("Company description is required");
  }

  const { width, height } = formatToSize[format];
  const fullPrompt = `${companyDescription}\n\n${prompt}`;

  // Map our format sizes to DALL-E 3 supported sizes
  let size: "1024x1024" | "1792x1024" | "1024x1792";
  if (format === "1:1") {
    size = "1024x1024";
  } else if (format === "16:9") {
    size = "1792x1024";
  } else {
    size = "1024x1792";
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: fullPrompt,
    n: 1,
    size,
    quality: "standard",
    response_format: "url",
  });

  if (!response.data?.[0]?.url) {
    throw new Error("No image URL in response");
  }

  return response.data[0].url;
}