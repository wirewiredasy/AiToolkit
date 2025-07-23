import { ToolTemplate } from "@/components/ui/tool-template";
import { Combine } from "lucide-react";

export default function PDFMergerPage() {
  return (
    <ToolTemplate
      toolId="pdf-merger"
      toolName="PDF Merger"
      description="Combine multiple PDF files into a single document. Merge PDFs in any order while maintaining quality and formatting."
      icon={<Combine className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={true}
      settings={[
        {
          key: "mergeOrder",
          label: "Merge Order",
          type: "select",
          options: ["Upload Order", "Alphabetical", "Date Modified", "File Size"],
          defaultValue: "Upload Order",
          description: "Order of merging PDF files"
        },
        {
          key: "pageRange",
          label: "Page Range (per file)",
          type: "text",
          placeholder: "all, 1-5, 10-20",
          description: "Specific pages to merge from each file (comma separated)"
        },
        {
          key: "addBookmarks",
          label: "Add Bookmarks",
          type: "switch",
          defaultValue: true,
          description: "Create bookmarks for each merged file"
        },
        {
          key: "preserveLinks",
          label: "Preserve Links",
          type: "switch",
          defaultValue: true,
          description: "Keep hyperlinks and internal links"
        },
        {
          key: "addPageNumbers",
          label: "Add Page Numbers",
          type: "switch",
          defaultValue: false,
          description: "Add continuous page numbers to merged PDF"
        }
      ]}
      endpoint="/api/tools/pdf-merger"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}