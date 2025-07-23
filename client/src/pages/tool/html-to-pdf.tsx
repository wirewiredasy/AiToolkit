import { ToolTemplate } from "@/components/ui/tool-template";
import { Globe } from "lucide-react";

export default function HTMLToPDFPage() {
  return (
    <ToolTemplate
      toolId="html-to-pdf"
      toolName="HTML to PDF Converter"
      description="Convert HTML web pages to PDF documents. Support for CSS styling, responsive design, and high-quality PDF generation."
      icon={<Globe className="h-8 w-8 text-white" />}
      acceptedFiles={{ "text/html": [".html", ".htm"], "text/plain": [".txt"] }}
      maxFileSize={10 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "htmlContent",
          label: "HTML Content",
          type: "textarea",
          placeholder: "<html><body><h1>Hello World</h1></body></html>",
          description: "HTML content to convert (or upload HTML file)"
        },
        {
          key: "pageSize",
          label: "Page Size",
          type: "select",
          options: ["A4", "A3", "A5", "Letter", "Legal", "Tabloid", "Custom"],
          defaultValue: "A4",
          description: "PDF page size"
        },
        {
          key: "orientation",
          label: "Orientation",
          type: "select",
          options: ["Portrait", "Landscape"],
          defaultValue: "Portrait",
          description: "Page orientation"
        },
        {
          key: "margins",
          label: "Margins",
          type: "select",
          options: ["None", "Small", "Medium", "Large", "Custom"],
          defaultValue: "Medium",
          description: "Page margins"
        },
        {
          key: "includeCSS",
          label: "Include External CSS",
          type: "switch",
          defaultValue: true,
          description: "Load external stylesheets and CSS"
        },
        {
          key: "includeImages",
          label: "Include Images",
          type: "switch",
          defaultValue: true,
          description: "Load and include images"
        },
        {
          key: "enableJavaScript",
          label: "Enable JavaScript",
          type: "switch",
          defaultValue: false,
          description: "Execute JavaScript before conversion"
        },
        {
          key: "printBackground",
          label: "Print Background",
          type: "switch",
          defaultValue: true,
          description: "Include background colors and images"
        }
      ]}
      endpoint="/api/tools/html-to-pdf"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}