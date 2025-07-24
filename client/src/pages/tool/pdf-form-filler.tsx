import { ToolTemplate } from "@/components/ui/tool-template";
import { FileText } from "lucide-react";

export default function PDFFormFillerPage() {
  return (
    <ToolTemplate
      toolId="pdf-form-filler"
      toolName="PDF Form Filler"
      description="Fill out PDF forms automatically with custom data. Supports interactive and non-interactive PDF forms."
      icon={<FileText className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      endpoint="/api/tools/pdf-form-filler"
      resultType="file"
      settings={[
        {
          key: "formData",
          label: "Form Data (JSON)",
          type: "textarea",
          placeholder: '{"name": "John Doe", "email": "john@example.com"}',
          description: "JSON object with field names and values to fill"
        },
        {
          key: "flattenForm",
          label: "Flatten Form Fields",
          type: "switch",
          defaultValue: true,
          description: "Make form fields non-editable after filling"
        }
      ]}
    />
  );
}