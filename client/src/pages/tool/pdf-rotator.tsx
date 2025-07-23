import { ToolTemplate } from "@/components/ui/tool-template";
import { RotateCw } from "lucide-react";

export default function PDFRotatorPage() {
  return (
    <ToolTemplate
      toolId="pdf-rotator"
      toolName="PDF Rotator"
      description="Rotate PDF pages to the correct orientation. Fix upside-down or sideways pages with precise rotation controls for individual or all pages."
      icon={<RotateCw className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "rotationAngle",
          label: "Rotation Angle",
          type: "select",
          options: ["90° (Clockwise)", "180° (Upside Down)", "270° (Counter-clockwise)"],
          defaultValue: "90° (Clockwise)",
          description: "Angle to rotate the pages"
        },
        {
          key: "pageRange",
          label: "Page Range",
          type: "select",
          options: ["All Pages", "Odd Pages", "Even Pages", "Custom Range"],
          defaultValue: "All Pages",
          description: "Which pages to rotate"
        },
        {
          key: "customRange",
          label: "Custom Page Range",
          type: "text",
          placeholder: "e.g., 1-5, 10, 15-20",
          description: "Specify pages to rotate (e.g., 1-5, 10, 15-20)"
        },
        {
          key: "autoDetect",
          label: "Auto-Detect Orientation",
          type: "switch",
          defaultValue: false,
          description: "Automatically detect and fix page orientation"
        }
      ]}
      endpoint="/api/tools/pdf-rotator"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}