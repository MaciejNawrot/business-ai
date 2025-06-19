"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateImage, ImageFormat } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [format, setFormat] = useState<ImageFormat>("1:1");
  
  const { mutate, data: image, isPending } = useMutation({
    mutationFn: (prompt: string) => generateImage(prompt, companyDescription, format),
    onSuccess: () => {
      toast.success("Image generated successfully!");
    },
    onError: (error: Error) => {
      console.error("Error generating image:", error);
      toast.error(error.message || "Failed to generate image");
    }
  });

  const handleSubmit = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    if (!companyDescription.trim()) {
      toast.error("Please enter a company description");
      return;
    }
    mutate(prompt);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Company Description</label>
          <Textarea
            placeholder="Enter your company description..."
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image Format</label>
          <Select value={format} onValueChange={(value: ImageFormat) => setFormat(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">Square (1024x1024)</SelectItem>
              <SelectItem value="16:9">Landscape (1792x1024)</SelectItem>
              <SelectItem value="9:16">Portrait (1024x1792)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image Prompt</label>
          <Input
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </div>
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={isPending}
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Image"
        )}
      </Button>

      {image && (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
          <img
            src={image}
            alt={prompt}
            className="object-cover"
            width={1024}
            height={1024}
          />
        </div>
      )}
    </div>
  );
}