
import { ToolTemplate } from "@/components/ui/tool-template";
import { Camera } from "lucide-react";

export default function PassportPhotoPage() {
  return (
    <ToolTemplate
      toolId="passport-photo"
      toolName="Passport Photo Maker"
      description="Create professional passport and ID photos that meet official requirements. Auto-crop, resize, and format for various document types."
      icon={<Camera className="h-8 w-8 text-white" />}
      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png", ".bmp"] }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "documentType",
          label: "Document Type",
          type: "select",
          options: ["Indian Passport", "US Passport", "UK Passport", "Visa Photo", "Aadhaar Card", "Driving License", "PAN Card", "Custom"],
          defaultValue: "Indian Passport",
          required: true,
          description: "Type of document photo"
        },
        {
          key: "photoSize",
          label: "Photo Size",
          type: "select",
          options: ["2x2 inches", "35x45 mm", "25x35 mm", "33x48 mm", "51x51 mm", "Custom"],
          defaultValue: "35x45 mm",
          description: "Standard photo dimensions"
        },
        {
          key: "backgroundColor",
          label: "Background Color",
          type: "select",
          options: ["White", "Light Blue", "Light Gray", "Red", "Blue", "Custom"],
          defaultValue: "White",
          description: "Photo background color"
        },
        {
          key: "autoDetectFace",
          label: "Auto Detect Face",
          type: "switch",
          defaultValue: true,
          description: "Automatically detect and center face"
        },
        {
          key: "removeBackground",
          label: "Remove Background",
          type: "switch",
          defaultValue: true,
          description: "Auto remove and replace background"
        },
        {
          key: "enhancePhoto",
          label: "Enhance Photo",
          type: "switch",
          defaultValue: true,
          description: "Improve lighting and clarity"
        },
        {
          key: "printLayout",
          label: "Print Layout",
          type: "select",
          options: ["Single Photo", "4 Photos", "6 Photos", "8 Photos"],
          defaultValue: "Single Photo",
          description: "Photos per page for printing"
        },
        {
          key: "dpi",
          label: "Print Quality (DPI)",
          type: "select",
          options: ["300 DPI", "600 DPI", "Print Quality"],
          defaultValue: "300 DPI",
          description: "Resolution for printing"
        }
      ]}
      endpoint="/api/tools/passport-photo"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}
