import { ToolTemplate } from "@/components/ui/tool-template";
import { FileDown } from "lucide-react";

export default function WordToPDFPage() {
  return (
    <ToolTemplate
      toolId="word-to-pdf"
      toolName="Word to PDF Converter"
      description="Convert Word documents to PDF format. Maintain formatting, fonts, and layout while creating professional PDF documents."
      icon={<FileDown className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "application/*": [".docx", ".doc", ".rtf"],
        "text/*": [".docx", ".doc"]
      }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "quality",
          label: "PDF Quality",
          type: "select",
          options: ["High (Print Ready)", "Medium (Web)", "Low (Email)"],
          defaultValue: "High (Print Ready)",
          description: "Output quality and file size"
        },
        {
          key: "pageOrientation",
          label: "Page Orientation",
          type: "select",
          options: ["Auto", "Portrait", "Landscape"],
          defaultValue: "Auto",
          description: "PDF page orientation"
        },
        {
          key: "margins",
          label: "Margins",
          type: "select",
          options: ["Normal", "Narrow", "Wide", "Custom"],
          defaultValue: "Normal",
          description: "Page margin settings"
        },
        {
          key: "embedFonts",
          label: "Embed Fonts",
          type: "switch",
          defaultValue: true,
          description: "Include fonts in PDF for consistent display"
        },
        {
          key: "passwordProtect",
          label: "Password Protection",
          type: "switch",
          defaultValue: false,
          description: "Add password protection to PDF"
        }
      ]}
      endpoint="/api/tools/word-to-pdf"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}