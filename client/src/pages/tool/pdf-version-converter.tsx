import { ToolTemplate } from "@/components/ui/tool-template";
import { FileType } from "lucide-react";

export default function PDFVersionConverterPage() {
  return (
    <ToolTemplate
      toolId="pdf-version-converter"
      toolName="PDF Version Converter"
      description="Convert PDF files between different versions for compatibility. Supports PDF 1.3 to 2.0."
      icon={<FileType className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      endpoint="/api/tools/pdf-version-converter"
      resultType="file"
      settings={[
        {
          key: "targetVersion",
          label: "Target PDF Version",
          type: "select",
          options: ["PDF 1.3", "PDF 1.4", "PDF 1.5", "PDF 1.6", "PDF 1.7", "PDF 2.0"],
          defaultValue: "PDF 1.7",
          description: "PDF version to convert to"
        },
        {
          key: "optimizeForWeb",
          label: "Optimize for Web",
          type: "switch",
          defaultValue: false,
          description: "Optimize PDF for web viewing"
        },
        {
          key: "preserveStructure",
          label: "Preserve Document Structure",
          type: "switch",
          defaultValue: true,
          description: "Keep original document structure and metadata"
        }
      ]}
    />
  );
}