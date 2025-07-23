import { ToolTemplate } from "@/components/ui/tool-template";
import { Eraser } from "lucide-react";

export default function WatermarkRemoverPage() {
  return (
    <ToolTemplate
      toolId="watermark-remover"
      toolName="AI Watermark Remover"
      description="Remove watermarks from images using advanced AI technology. Automatically detect and remove logos, text, and other watermarks while preserving image quality."
      icon={<Eraser className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"] 
      }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "detectionMode",
          label: "Detection Mode",
          type: "select",
          options: ["Automatic", "Text Only", "Logo Only", "Manual Selection"],
          defaultValue: "Automatic",
          description: "How to detect watermarks"
        },
        {
          key: "aiModel",
          label: "AI Model",
          type: "select",
          options: ["LaMa (Advanced)", "EdgeConnect (Fast)", "DeepFill (Precise)"],
          defaultValue: "LaMa (Advanced)",
          description: "AI model for watermark removal"
        },
        {
          key: "inpaintingStrength",
          label: "Inpainting Strength",
          type: "slider",
          min: 1,
          max: 10,
          step: 1,
          defaultValue: 7,
          description: "Intensity of the inpainting process"
        },
        {
          key: "edgeBlending",
          label: "Edge Blending",
          type: "slider",
          min: 0,
          max: 10,
          step: 1,
          defaultValue: 5,
          description: "Smooth edges around removed areas"
        },
        {
          key: "colorMatching",
          label: "Color Matching",
          type: "switch",
          defaultValue: true,
          description: "Match colors of surrounding pixels"
        },
        {
          key: "textureRecovery",
          label: "Texture Recovery",
          type: "switch",
          defaultValue: true,
          description: "Restore underlying texture patterns"
        }
      ]}
      endpoint="/api/tools/watermark-remover"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}