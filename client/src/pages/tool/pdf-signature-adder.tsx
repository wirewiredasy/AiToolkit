import { ToolTemplate } from "@/components/ui/tool-template";
import { PenTool } from "lucide-react";

export default function PDFSignatureAdderPage() {
  return (
    <ToolTemplate
      toolId="pdf-signature-adder"
      toolName="PDF Signature Adder"
      description="Add digital signatures or signature images to PDF documents. Support for multiple signature positions."
      icon={<PenTool className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      endpoint="/api/tools/pdf-signature-adder"
      resultType="file"
      settings={[
        {
          key: "signatureText",
          label: "Signature Text",
          type: "text",
          placeholder: "Your Name",
          description: "Text to use for digital signature"
        },
        {
          key: "position",
          label: "Signature Position",
          type: "select",
          options: ["Bottom Right", "Bottom Left", "Top Right", "Top Left", "Center"],
          defaultValue: "Bottom Right",
          description: "Where to place the signature"
        },
        {
          key: "pageNumber",
          label: "Page Number",
          type: "number",
          defaultValue: 1,
          description: "Page number to add signature (0 for last page)"
        }
      ]}
    />
  );
}