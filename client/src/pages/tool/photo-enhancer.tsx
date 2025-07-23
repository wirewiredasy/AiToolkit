import { ToolTemplate } from "@/components/ui/tool-template";
import { Star } from "lucide-react";

export default function PhotoEnhancerPage() {
  return (
    <ToolTemplate
      toolId="photo-enhancer"
      toolName="AI Photo Enhancer"
      description="Enhance your photos with professional-grade AI technology. Improve lighting, colors, sharpness, and overall quality automatically."
      icon={<Star className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"] 
      }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "enhancementType",
          label: "Enhancement Type",
          type: "select",
          options: ["Auto (AI Powered)", "Portrait", "Landscape", "Low Light", "Old Photo Restoration"],
          defaultValue: "Auto (AI Powered)",
          description: "Type of enhancement to apply"
        },
        {
          key: "brightness",
          label: "Brightness Adjustment",
          type: "slider",
          min: -50,
          max: 50,
          step: 5,
          defaultValue: 0,
          description: "Adjust overall brightness (-50 to +50)"
        },
        {
          key: "contrast",
          label: "Contrast Enhancement",
          type: "slider",
          min: -50,
          max: 50,
          step: 5,
          defaultValue: 10,
          description: "Enhance contrast (-50 to +50)"
        },
        {
          key: "saturation",
          label: "Color Saturation",
          type: "slider",
          min: -50,
          max: 50,
          step: 5,
          defaultValue: 15,
          description: "Adjust color intensity (-50 to +50)"
        },
        {
          key: "sharpening",
          label: "Sharpening",
          type: "slider",
          min: 0,
          max: 100,
          step: 5,
          defaultValue: 30,
          description: "Enhance image sharpness (0-100)"
        },
        {
          key: "noiseReduction",
          label: "Noise Reduction",
          type: "slider",
          min: 0,
          max: 100,
          step: 5,
          defaultValue: 40,
          description: "Reduce image noise and grain (0-100)"
        },
        {
          key: "colorCorrection",
          label: "Auto Color Correction",
          type: "switch",
          defaultValue: true,
          description: "Automatically correct color balance"
        }
      ]}
      endpoint="/api/tools/photo-enhancer"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}