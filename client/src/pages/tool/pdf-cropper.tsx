import { ToolTemplate } from "@/components/ui/tool-template";
import { Crop } from "lucide-react";

export default function PDFCropperPage() {
  return (
    <ToolTemplate
      toolId="pdf-cropper"
      toolName="PDF Cropper"
      description="Crop PDF pages to remove unwanted margins, headers, or footers. Customize the crop area to focus on the essential content of your documents."
      icon={<Crop className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "cropPreset",
          label: "Crop Preset",
          type: "select",
          options: ["Custom", "Remove Margins", "Letter Size", "A4 Size", "Legal Size"],
          defaultValue: "Remove Margins",
          description: "Predefined crop settings"
        },
        {
          key: "marginTop",
          label: "Top Margin (mm)",
          type: "number",
          min: 0,
          max: 100,
          defaultValue: 10,
          description: "Top margin to remove"
        },
        {
          key: "marginBottom",
          label: "Bottom Margin (mm)",
          type: "number",
          min: 0,
          max: 100,
          defaultValue: 10,
          description: "Bottom margin to remove"
        },
        {
          key: "marginLeft",
          label: "Left Margin (mm)",
          type: "number",
          min: 0,
          max: 100,
          defaultValue: 10,
          description: "Left margin to remove"
        },
        {
          key: "marginRight",
          label: "Right Margin (mm)",
          type: "number",
          min: 0,
          max: 100,
          defaultValue: 10,
          description: "Right margin to remove"
        },
        {
          key: "applyToAll",
          label: "Apply to All Pages",
          type: "switch",
          defaultValue: true,
          description: "Apply the same crop settings to all pages"
        }
      ]}
      endpoint="/api/tools/pdf-cropper"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}