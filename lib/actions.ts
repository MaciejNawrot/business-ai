"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(prompt: string) {
  if (!prompt.trim()) {
    throw new Error("Prompt is required");
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    });

    const imageUrl = response.data[0].url;

    if (!imageUrl) {
      throw new Error("No image URL in response");
    }

    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image");
  }
}