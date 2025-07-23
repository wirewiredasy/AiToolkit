import { ToolTemplate } from "@/components/ui/tool-template";
import { Scissors } from "lucide-react";

export default function PDFSplitterPage() {
  return (
    <ToolTemplate
      toolId="pdf-splitter"
      toolName="PDF Splitter"
      description="Split large PDF files into smaller documents. Extract specific pages or split by page ranges, bookmarks, or file size."
      icon={<Scissors className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "splitMode",
          label: "Split Mode",
          type: "select",
          options: ["By Page Range", "Every N Pages", "By Bookmarks", "By File Size", "Extract Pages"],
          defaultValue: "By Page Range",
          description: "How to split the PDF"
        },
        {
          key: "pageRanges",
          label: "Page Ranges",
          type: "text",
          placeholder: "1-5, 6-10, 11-15",
          description: "Specific page ranges (for Page Range mode)"
        },
        {
          key: "pagesPerFile",
          label: "Pages per File",
          type: "number",
          min: 1,
          max: 100,
          defaultValue: 10,
          description: "Number of pages in each split file"
        },
        {
          key: "preserveBookmarks",
          label: "Preserve Bookmarks",
          type: "switch",
          defaultValue: true,
          description: "Keep bookmarks in split files"
        },
        {
          key: "filenamePattern",
          label: "Filename Pattern",
          type: "select",
          options: ["original_part1", "original_pages_1-5", "part_001", "custom"],
          defaultValue: "original_part1",
          description: "Naming pattern for split files"
        }
      ]}
      endpoint="/api/tools/pdf-splitter"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}