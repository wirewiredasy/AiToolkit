import { ToolTemplate } from "@/components/ui/tool-template";
import { Maximize } from "lucide-react";

export default function ImageResizerPage() {
  return (
    <ToolTemplate
      toolId="image-resizer"
      toolName="Image Resizer"
      description="Resize images to any dimensions while maintaining quality. Perfect for social media posts, websites, or printing requirements."
      icon={<Maximize className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"] 
      }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "width",
          label: "Width (pixels)",
          type: "number",
          min: 1,
          max: 8000,
          defaultValue: 800,
          required: true,
          description: "Target width in pixels"
        },
        {
          key: "height",
          label: "Height (pixels)",
          type: "number",
          min: 1,
          max: 8000,
          defaultValue: 600,
          required: true,
          description: "Target height in pixels"
        },
        {
          key: "maintainAspectRatio",
          label: "Maintain Aspect Ratio",
          type: "switch",
          defaultValue: true,
          description: "Keep the original image proportions"
        },
        {
          key: "resizeMethod",
          label: "Resize Method",
          type: "select",
          options: ["Lanczos (Best Quality)", "Bicubic (Good)", "Bilinear (Fast)", "Nearest (Fastest)"],
          defaultValue: "Lanczos (Best Quality)",
          description: "Algorithm used for resizing"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["Same as Input", "JPG", "PNG", "WebP"],
          defaultValue: "Same as Input",
          description: "Output image format"
        }
      ]}
      endpoint="/api/tools/image-resizer"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}