"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateImage } from "@/lib/actions";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    try {
      const imageUrl = await generateImage(prompt);
      setImage(imageUrl);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      {image && (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
          <img
            src={image}
            alt={prompt}
            className="object-cover"
            width={512}
            height={512}
          />
        </div>
      )}
    </div>
  );
}