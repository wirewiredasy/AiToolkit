import { ToolTemplate } from "@/components/ui/tool-template";
import { FileText } from "lucide-react";

export default function PDFToWordPage() {
  return (
    <ToolTemplate
      toolId="pdf-to-word"
      toolName="PDF to Word Converter"
      description="Convert PDF documents to editable Word files. Preserve formatting, images, and layout while making your PDFs fully editable."
      icon={<FileText className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["DOCX (Word 2007+)", "DOC (Word 97-2003)", "RTF (Rich Text)"],
          defaultValue: "DOCX (Word 2007+)",
          description: "Choose the Word document format"
        },
        {
          key: "conversionMode",
          label: "Conversion Mode",
          type: "select",
          options: ["Layout Preservation", "Text Extraction", "OCR (Scanned PDFs)"],
          defaultValue: "Layout Preservation",
          description: "How to handle PDF content"
        },
        {
          key: "preserveImages",
          label: "Preserve Images",
          type: "switch",
          defaultValue: true,
          description: "Include images in the Word document"
        },
        {
          key: "preserveFormatting",
          label: "Preserve Formatting",
          type: "switch",
          defaultValue: true,
          description: "Maintain fonts, colors, and styles"
        },
        {
          key: "pageRange",
          label: "Page Range",
          type: "text",
          placeholder: "1-10, 15, 20-25",
          description: "Convert specific pages (leave empty for all)"
        }
      ]}
      endpoint="/api/tools/pdf-to-word"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}