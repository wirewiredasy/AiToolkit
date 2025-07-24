import { ToolTemplate } from "@/components/ui/tool-template";
import { Bookmark } from "lucide-react";

export default function PDFBookmarkManagerPage() {
  return (
    <ToolTemplate
      toolId="pdf-bookmark-manager"
      toolName="PDF Bookmark Manager"
      description="Add, remove, or extract bookmarks from PDF documents for better navigation."
      icon={<Bookmark className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      endpoint="/api/tools/pdf-bookmark-manager"
      resultType="file"
      settings={[
        {
          key: "action",
          label: "Bookmark Action",
          type: "select",
          options: ["Add Bookmarks", "Remove All", "Extract List"],
          defaultValue: "Add Bookmarks",
          description: "Choose bookmark management action"
        },
        {
          key: "autoGenerate",
          label: "Auto-generate from Headings",
          type: "switch",
          defaultValue: true,
          description: "Automatically create bookmarks from document headings"
        }
      ]}
    />
  );
}