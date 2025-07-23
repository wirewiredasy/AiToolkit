import { ToolTemplate } from "@/components/ui/tool-template";
import { Sparkles } from "lucide-react";

export default function ImageEnhancerPage() {
  return (
    <ToolTemplate
      toolId="image-enhancer"
      toolName="AI Image Enhancer"
      description="Enhance your images with advanced AI technology. Improve clarity, reduce noise, enhance colors, and upscale resolution for professional-quality results."
      icon={<Sparkles className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"] 
      }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "enhancementLevel",
          label: "Enhancement Level",
          type: "select",
          options: ["Light", "Moderate", "Strong", "Maximum"],
          defaultValue: "Moderate",
          description: "Intensity of AI enhancement"
        },
        {
          key: "noiseReduction",
          label: "Noise Reduction",
          type: "slider",
          min: 0,
          max: 100,
          step: 5,
          defaultValue: 50,
          description: "Reduce image noise and grain"
        },
        {
          key: "sharpening",
          label: "Sharpening",
          type: "slider",
          min: 0,
          max: 100,
          step: 5,
          defaultValue: 30,
          description: "Enhance image details and edges"
        },
        {
          key: "colorEnhancement",
          label: "Color Enhancement",
          type: "slider",
          min: 0,
          max: 100,
          step: 5,
          defaultValue: 40,
          description: "Improve color vibrancy and contrast"
        },
        {
          key: "upscaling",
          label: "AI Upscaling",
          type: "select",
          options: ["None", "2x", "4x"],
          defaultValue: "None",
          description: "Increase image resolution using AI"
        },
        {
          key: "preserveDetails",
          label: "Preserve Fine Details",
          type: "switch",
          defaultValue: true,
          description: "Maintain texture and fine details during enhancement"
        }
      ]}
      endpoint="/api/tools/image-enhancer"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}