"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateImage } from "@/lib/actions";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  
  const { mutate, data: image, isPending } = useMutation({
    mutationFn: generateImage,
    onSuccess: (imageUrl: string) => {
      toast.success("Image generated successfully!");
    },
    onError: (error: Error) => {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image");
    }
  });

  const handleSubmit = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    mutate(prompt);
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
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? (
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