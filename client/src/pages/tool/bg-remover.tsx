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
          options: ["U2Net (General)", "SILUETA (Portraits)", "ISNET (Precise)", "MODNet (Fast)"],
          defaultValue: "U2Net (General)",
          description: "AI model for background removal"
        },
        {
          key: "edgeSmoothing",
          label: "Edge Smoothing",
          type: "slider",
          min: 0,
          max: 10,
          step: 1,
          defaultValue: 3,
          description: "Smooth edges around subject (0-10)"
        },
        {
          key: "featherEdges",
          label: "Feather Edges",
          type: "slider",
          min: 0,
          max: 20,
          step: 1,
          defaultValue: 2,
          description: "Feather edge pixels for natural blending"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["PNG (Transparent)", "JPG (White Background)", "WebP (Transparent)"],
          defaultValue: "PNG (Transparent)",
          description: "Output file format"
        },
        {
          key: "backgroundColor",
          label: "Background Color",
          type: "text",
          defaultValue: "#FFFFFF",
          placeholder: "#FFFFFF",
          description: "Background color (for non-transparent formats)"
        },
        {
          key: "highPrecision",
          label: "High Precision Mode",
          type: "switch",
          defaultValue: false,
          description: "Use higher precision (slower but better quality)"
        }
      ]}
      endpoint="/api/tools/bg-remover"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}