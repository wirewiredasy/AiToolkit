
import { ToolTemplate } from "@/components/ui/tool-template";
import { Eye } from "lucide-react";

export default function ImageBlurToolPage() {
  return (
    <ToolTemplate
      toolId="image-blur-tool"
      toolName="Image Blur Tool"
      description="Apply various blur effects to images. Create motion blur, gaussian blur, radial blur, and other artistic blur effects."
      icon={<Eye className="h-8 w-8 text-white" />}
      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "blurType",
          label: "Blur Type",
          type: "select",
          options: ["Gaussian", "Motion", "Radial", "Zoom", "Surface", "Lens"],
          defaultValue: "Gaussian",
          required: true,
          description: "Type of blur effect"
        },
        {
          key: "blurStrength",
          label: "Blur Strength",
          type: "select",
          options: ["Light", "Medium", "Strong", "Very Strong"],
          defaultValue: "Medium",
          description: "Intensity of blur effect"
        },
        {
          key: "blurRadius",
          label: "Blur Radius (px)",
          type: "select",
          options: ["5", "10", "20", "50", "100"],
          defaultValue: "20",
          description: "Blur radius in pixels"
        },
        {
          key: "preserveEdges",
          label: "Preserve Edges",
          type: "switch",
          defaultValue: false,
          description: "Keep important edges sharp"
        },
        {
          key: "selectiveBlur",
          label: "Selective Blur",
          type: "switch",
          defaultValue: false,
          description: "Blur only specific areas"
        }
      ]}
      endpoint="/api/tools/image-blur-tool"
      gradientFrom="from-indigo-500"
      gradientTo="to-purple-600"
    />
  );
}
