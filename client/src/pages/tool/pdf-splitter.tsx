import { ToolTemplate } from "@/components/ui/tool-template";
import { Scissors } from "lucide-react";

export default function PDFSplitterPage() {
  return (
    <ToolTemplate
      toolId="pdf-splitter"
      toolName="PDF Splitter"
      description="Split PDF files into multiple documents. Extract specific pages, create separate files, or divide by page ranges."
      icon={<Scissors className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "splitMethod",
          label: "Split Method",
          type: "select",
          options: ["All Pages (One per file)", "Page Ranges", "Every N Pages", "Split at Bookmarks"],
          defaultValue: "All Pages (One per file)",
          description: "How to split the PDF"
        },
        {
          key: "pageRanges",
          label: "Page Ranges",
          type: "text",
          placeholder: "1-5, 10-15, 20",
          description: "Specify ranges (e.g., 1-5, 10-15, 20)"
        },
        {
          key: "pagesPerFile",
          label: "Pages per File",
          type: "number",
          min: 1,
          max: 100,
          defaultValue: 1,
          description: "Number of pages in each output file"
        },
        {
          key: "namingPattern",
          label: "File Naming",
          type: "select",
          options: ["Page Numbers", "Sequential", "Original + Suffix"],
          defaultValue: "Page Numbers",
          description: "How to name the split files"
        }
      ]}
      endpoint="/api/tools/pdf-splitter"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}