import { ToolTemplate } from "@/components/ui/tool-template";
import { CreditCard } from "lucide-react";

export default function PANValidatorPage() {
  return (
    <ToolTemplate
      toolId="pan-validator"
      toolName="PAN Card Validator"
      description="Validate Indian PAN (Permanent Account Number) card format and check validity. Verify PAN card structure and format compliance."
      icon={<CreditCard className="h-8 w-8 text-white" />}
      resultType="validation"
      settings={[
        {
          key: "panNumber",
          label: "PAN Number",
          type: "text",
          placeholder: "ABCDE1234F",
          required: true,
          description: "Enter 10-character PAN number to validate"
        },
        {
          key: "validationType",
          label: "Validation Type",
          type: "select",
          options: ["Format Check", "Checksum Validation", "Real-time Verification"],
          defaultValue: "Format Check",
          description: "Level of validation to perform"
        },
        {
          key: "showDetails",
          label: "Show PAN Details",
          type: "switch",
          defaultValue: true,
          description: "Display PAN breakdown and structure"
        },
        {
          key: "checkPattern",
          label: "Pattern Analysis",
          type: "switch",
          defaultValue: true,
          description: "Analyze PAN number pattern and structure"
        }
      ]}
      endpoint="/api/tools/pan-validator"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
    />
  );
}