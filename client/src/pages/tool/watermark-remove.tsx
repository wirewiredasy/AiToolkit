
import { ToolTemplate } from "@/components/ui/tool-template";
import { Eraser } from "lucide-react";

export default function WatermarkRemovePage() {
  return (
    <ToolTemplate
      toolId="watermark-remove"
      toolName="Watermark Remover"
      description="Remove watermarks from images using AI-powered inpainting technology. Perfect for cleaning up images while preserving quality."
      icon={<Eraser className="h-8 w-8 text-white" />}
      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
      maxFileSize={10 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "detectionMode",
          label: "Detection Mode",
          type: "select",
          options: ["Automatic", "Manual Selection", "Text Only", "Logo Only"],
          defaultValue: "Automatic",
          description: "How to detect watermarks"
        },
        {
          key: "removalStrength",
          label: "Removal Strength",
          type: "select",
          options: ["Conservative", "Moderate", "Aggressive"],
          defaultValue: "Moderate",
          description: "Intensity of watermark removal"
        },
        {
          key: "preserveDetails",
          label: "Preserve Image Details",
          type: "switch",
          defaultValue: true,
          description: "Maintain image quality and details"
        },
        {
          key: "enhanceResult",
          label: "Enhance Result",
          type: "switch",
          defaultValue: false,
          description: "Apply AI enhancement to result"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["PNG", "JPG", "WEBP"],
          defaultValue: "PNG",
          description: "Choose output format"
        }
      ]}
      endpoint="/api/tools/watermark-remove"
      gradientFrom="from-red-500"
      gradientTo="to-pink-600"
    />
  );
}
