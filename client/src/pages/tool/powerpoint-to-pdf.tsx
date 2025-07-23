import { ToolTemplate } from "@/components/ui/tool-template";
import { Presentation } from "lucide-react";

export default function PowerPointToPDFPage() {
  return (
    <ToolTemplate
      toolId="powerpoint-to-pdf"
      toolName="PowerPoint to PDF Converter"
      description="Convert PowerPoint presentations to PDF format while preserving layout and formatting. Supports .ppt and .pptx files."
      icon={<Presentation className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "application/vnd.ms-powerpoint": [".ppt"],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"]
      }}
      maxFileSize={100 * 1024 * 1024} // 100MB
      allowMultiple={false}
      endpoint="/api/tools/powerpoint-to-pdf"
      resultType="file"
      settings={[
        {
          key: "quality",
          label: "PDF Quality",
          type: "select",
          options: ["High", "Medium", "Low"],
          defaultValue: "High",
          description: "Output PDF quality level"
        },
        {
          key: "includeNotes",
          label: "Include Notes",
          type: "switch",
          defaultValue: false,
          description: "Include speaker notes in PDF"
        },
        {
          key: "preserveAnimations",
          label: "Preserve Animations",
          type: "switch",
          defaultValue: false,
          description: "Convert animations to static frames"
        }
      ]}
    />
  );
}