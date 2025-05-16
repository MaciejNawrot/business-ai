import { ImageGenerator } from "@/components/ImageGenerator";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Image Generator</h1>
        <p className="text-muted-foreground">
          Generate unique images using DALL-E 3
        </p>
      </div>
      <ImageGenerator />
    </div>
  );
}
