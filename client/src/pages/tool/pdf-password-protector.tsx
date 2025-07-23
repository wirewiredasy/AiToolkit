import { ToolTemplate } from "@/components/ui/tool-template";
import { Lock } from "lucide-react";

export default function PDFPasswordProtectorPage() {
  return (
    <ToolTemplate
      toolId="pdf-password-protector"
      toolName="PDF Password Protector"
      description="Add password protection to your PDF documents. Secure your files with custom passwords and permission settings to control access and editing."
      icon={<Lock className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "userPassword",
          label: "User Password",
          type: "text",
          placeholder: "Password to open the PDF",
          required: true,
          description: "Password required to open and view the PDF"
        },
        {
          key: "ownerPassword",
          label: "Owner Password",
          type: "text",
          placeholder: "Password for full permissions",
          description: "Password for modifying permissions (optional)"
        },
        {
          key: "allowPrinting",
          label: "Allow Printing",
          type: "switch",
          defaultValue: true,
          description: "Allow users to print the document"
        },
        {
          key: "allowCopying",
          label: "Allow Copying",
          type: "switch",
          defaultValue: false,
          description: "Allow users to copy text and images"
        },
        {
          key: "allowEditing",
          label: "Allow Editing",
          type: "switch",
          defaultValue: false,
          description: "Allow users to edit the document"
        },
        {
          key: "encryptionLevel",
          label: "Encryption Level",
          type: "select",
          options: ["128-bit RC4", "128-bit AES", "256-bit AES"],
          defaultValue: "256-bit AES",
          description: "Security level for encryption"
        }
      ]}
      endpoint="/api/tools/pdf-password-protector"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}