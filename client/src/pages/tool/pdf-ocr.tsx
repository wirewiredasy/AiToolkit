import { ToolTemplate } from "@/components/ui/tool-template";
import { Eye } from "lucide-react";

export default function PDFOCRPage() {
  return (
    <ToolTemplate
      toolId="pdf-ocr"
      toolName="PDF OCR"
      description="Extract text from scanned PDFs using advanced optical character recognition technology. Convert image-based PDFs to searchable, editable text documents."
      icon={<Eye className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "language",
          label: "OCR Language",
          type: "select",
          options: ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Hindi"],
          defaultValue: "English",
          description: "Select the primary language for text recognition"
        },
        {
          key: "accuracy",
          label: "Recognition Accuracy",
          type: "select",
          options: ["Standard", "High", "Maximum"],
          defaultValue: "High",
          description: "Higher accuracy takes more processing time"
        },
        {
          key: "deskew",
          label: "Auto-Deskew",
          type: "switch",
          defaultValue: true,
          description: "Automatically correct skewed text"
        }
      ]}
      endpoint="/api/tools/pdf-ocr"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}