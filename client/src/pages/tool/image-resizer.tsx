import { ToolTemplate } from "@/components/ui/tool-template";
import { Maximize } from "lucide-react";

export default function ImageResizerPage() {
  return (
    <ToolTemplate
      toolId="image-resizer"
      toolName="Image Resizer"
      description="Resize images to specific dimensions or percentages. Maintain aspect ratio or stretch to exact dimensions with quality preservation."
      icon={<Maximize className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp", ".gif"] 
      }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={true}
      settings={[
        {
          key: "resizeMode",
          label: "Resize Mode",
          type: "select",
          options: ["By Percentage", "By Width", "By Height", "Exact Dimensions", "Fit in Box"],
          defaultValue: "By Percentage",
          description: "How to resize the image"
        },
        {
          key: "percentage",
          label: "Resize Percentage",
          type: "slider",
          min: 10,
          max: 500,
          step: 5,
          defaultValue: 100,
          description: "Percentage to resize (10-500%)"
        },
        {
          key: "width",
          label: "Width (pixels)",
          type: "number",
          min: 10,
          max: 8000,
          defaultValue: 800,
          description: "Target width in pixels"
        },
        {
          key: "height",
          label: "Height (pixels)",
          type: "number",
          min: 10,
          max: 8000,
          defaultValue: 600,
          description: "Target height in pixels"
        },
        {
          key: "maintainAspectRatio",
          label: "Maintain Aspect Ratio",
          type: "switch",
          defaultValue: true,
          description: "Keep original proportions"
        },
        {
          key: "quality",
          label: "Output Quality",
          type: "slider",
          min: 10,
          max: 100,
          step: 5,
          defaultValue: 90,
          description: "Image quality (10-100%)"
        },
        {
          key: "resamplingMethod",
          label: "Resampling Method",
          type: "select",
          options: ["Bicubic (Best)", "Bilinear", "Nearest Neighbor", "Lanczos"],
          defaultValue: "Bicubic (Best)",
          description: "Algorithm for resizing"
        }
      ]}
      endpoint="/api/tools/image-resizer"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}