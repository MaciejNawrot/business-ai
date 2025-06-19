"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ImageFormat = "1:1" | "16:9" | "4:5" | "9:16";

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

export type BusinessProfile = {
  businessName: string;
  industry: string;
  targetAudience: string;
  uniqueValue: string;
  competitors: string;
  goals: string;
  challenges: string;
  budget: string;
  timeline: string;
};

export async function analyzeBusinessProfile(profile: BusinessProfile): Promise<string> {
  const prompt = `Analyze this business profile and provide a comprehensive analysis:

Business Name: ${profile.businessName}
Industry: ${profile.industry}
Target Audience: ${profile.targetAudience}
Unique Value Proposition: ${profile.uniqueValue}
Main Competitors: ${profile.competitors}
Business Goals: ${profile.goals}
Current Challenges: ${profile.challenges}
Budget Range: ${profile.budget}
Timeline: ${profile.timeline}

Please provide a detailed analysis including:
1. Key Business Strengths
2. Market Opportunities
3. Potential Risks
4. Recommended Strategies
5. Target Audience Analysis
6. Competitive Position
7. Resource Allocation Suggestions
8. Timeline Recommendations

Format the response in a clear, structured way with sections and bullet points where appropriate.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a business analysis expert. Provide detailed, actionable insights based on the business profile data."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0]?.message?.content || "No analysis generated";
  } catch (error) {
    console.error("Error analyzing business profile:", error);
    throw new Error("Failed to analyze business profile");
  }
}