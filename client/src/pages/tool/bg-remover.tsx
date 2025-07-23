import { ToolTemplate } from "@/components/ui/tool-template";
import { Layers } from "lucide-react";

export default function BackgroundRemoverPage() {
  return (
    <ToolTemplate
      toolId="bg-remover"
      toolName="AI Background Remover"
      description="Remove backgrounds from images automatically using advanced AI. Perfect for product photos, portraits, and creating transparent images."
      icon={<Layers className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"] 
      }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "aiModel",
          label: "AI Model",
          type: "select",
          options: ["U2Net (General)", "SILUETA (People)", "Realistic (Photos)", "Anime (Illustrations)"],
          defaultValue: "U2Net (General)",
          description: "AI model optimized for different image types"
        },
        {
          key: "edgeSmoothing",
          label: "Edge Smoothing",
          type: "slider",
          min: 0,
          max: 10,
          step: 1,
          defaultValue: 3,
          description: "Smooth rough edges (0=none, 10=maximum)"
        },
        {
          key: "featherEdges",
          label: "Feather Edges",
          type: "slider",
          min: 0,
          max: 5,
          step: 0.5,
          defaultValue: 1,
          description: "Soften edges for natural blending"
        },
        {
          key: "backgroundReplacement",
          label: "Background Replacement",
          type: "select",
          options: ["Transparent", "White", "Black", "Blue", "Green"],
          defaultValue: "Transparent",
          description: "Replace background with color or transparency"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["PNG (Transparent)", "JPG (With Background)", "WebP (Transparent)"],
          defaultValue: "PNG (Transparent)",
          description: "Output format for the processed image"
        }
      ]}
      endpoint="/api/tools/bg-remover"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}