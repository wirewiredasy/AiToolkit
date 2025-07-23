
import { ToolTemplate } from "@/components/ui/tool-template";
import { Sparkles } from "lucide-react";

export default function ImageEnhancePage() {
  return (
    <ToolTemplate
      toolId="image-enhance"
      toolName="AI Image Enhancer"
      description="Enhance image quality using advanced AI algorithms. Improve sharpness, reduce noise, and enhance overall image quality automatically."
      icon={<Sparkles className="h-8 w-8 text-white" />}
      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png", ".webp", ".bmp"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "enhanceMode",
          label: "Enhancement Mode",
          type: "select",
          options: ["Auto", "Portrait", "Landscape", "Low Light", "Old Photo", "Custom"],
          defaultValue: "Auto",
          required: true,
          description: "AI enhancement mode"
        },
        {
          key: "noiseReduction",
          label: "Noise Reduction",
          type: "select",
          options: ["None", "Light", "Medium", "Strong"],
          defaultValue: "Medium",
          description: "Remove image noise and grain"
        },
        {
          key: "sharpening",
          label: "Sharpening Level",
          type: "select",
          options: ["None", "Light", "Medium", "Strong"],
          defaultValue: "Medium",
          description: "Enhance image sharpness"
        },
        {
          key: "colorCorrection",
          label: "Color Correction",
          type: "switch",
          defaultValue: true,
          description: "Automatically correct colors"
        },
        {
          key: "upscale",
          label: "Upscale Image",
          type: "switch",
          defaultValue: false,
          description: "Increase image resolution (2x)"
        }
      ]}
      endpoint="/api/tools/image-enhance"
      gradientFrom="from-blue-500"
      gradientTo="to-purple-600"
    />
  );
}
