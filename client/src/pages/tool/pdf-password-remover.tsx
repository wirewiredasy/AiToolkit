import { ToolTemplate } from "@/components/ui/tool-template";
import { Unlock } from "lucide-react";

export default function PDFPasswordRemoverPage() {
  return (
    <ToolTemplate
      toolId="pdf-password-remover"
      toolName="PDF Password Remover"
      description="Remove password protection from PDF files. Enter the current password to unlock and create an unprotected version of your PDF document."
      icon={<Unlock className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "currentPassword",
          label: "Current Password",
          type: "text",
          placeholder: "Enter current PDF password",
          required: true,
          description: "The password currently protecting the PDF"
        },
        {
          key: "verifyRemoval",
          label: "Verify Password Removal",
          type: "switch",
          defaultValue: true,
          description: "Test that the password has been successfully removed"
        }
      ]}
      endpoint="/api/tools/pdf-password-remover"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}