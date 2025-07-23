import { ToolTemplate } from "@/components/ui/tool-template";
import { Stamp } from "lucide-react";

export default function PDFWatermarkPage() {
  return (
    <ToolTemplate
      toolId="pdf-watermark"
      toolName="PDF Watermark"
      description="Add professional watermarks to your PDF documents. Support for text and image watermarks with customizable opacity, position, and rotation."
      icon={<Stamp className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "watermarkText",
          label: "Watermark Text",
          type: "text",
          placeholder: "Enter watermark text",
          defaultValue: "CONFIDENTIAL",
          description: "Text to be used as watermark"
        },
        {
          key: "opacity",
          label: "Opacity",
          type: "slider",
          min: 10,
          max: 100,
          step: 5,
          defaultValue: 30,
          description: "Transparency level of the watermark"
        },
        {
          key: "position",
          label: "Position",
          type: "select",
          options: ["Center", "Top Left", "Top Right", "Bottom Left", "Bottom Right"],
          defaultValue: "Center",
          description: "Position of the watermark on the page"
        },
        {
          key: "rotation",
          label: "Rotation Angle",
          type: "slider",
          min: -45,
          max: 45,
          step: 5,
          defaultValue: 0,
          description: "Rotation angle in degrees"
        },
        {
          key: "fontSize",
          label: "Font Size",
          type: "slider",
          min: 12,
          max: 72,
          step: 2,
          defaultValue: 36,
          description: "Size of the watermark text"
        }
      ]}
      endpoint="/api/tools/pdf-watermark"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}