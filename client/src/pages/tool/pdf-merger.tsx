import { ToolTemplate } from "@/components/ui/tool-template";
import { FileText } from "lucide-react";

export default function PDFMergerPage() {
  return (
    <ToolTemplate
      toolId="pdf-merger"
      toolName="PDF Merger"
      description="Merge multiple PDF files into a single document. Combine PDFs in any order and create professional consolidated documents."
      icon={<FileText className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={true}
      settings={[
        {
          key: "mergeOrder",
          label: "Merge Order",
          type: "select",
          options: ["Upload Order", "Alphabetical", "Reverse Alphabetical", "File Size (Small to Large)", "File Size (Large to Small)"],
          defaultValue: "Upload Order",
          description: "Order in which PDFs will be merged"
        },
        {
          key: "addBookmarks",
          label: "Add Bookmarks",
          type: "switch",
          defaultValue: true,
          description: "Create bookmarks for each merged PDF"
        },
        {
          key: "preserveMetadata",
          label: "Preserve Metadata",
          type: "switch",
          defaultValue: true,
          description: "Keep original PDF metadata"
        },
        {
          key: "optimizeSize",
          label: "Optimize File Size",
          type: "switch",
          defaultValue: false,
          description: "Compress the merged PDF to reduce size"
        }
      ]}
      endpoint="/api/tools/pdf-merger"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}