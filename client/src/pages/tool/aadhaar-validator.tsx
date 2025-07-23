import { ToolTemplate } from "@/components/ui/tool-template";
import { User } from "lucide-react";

export default function AadhaarValidatorPage() {
  return (
    <ToolTemplate
      toolId="aadhaar-validator"
      toolName="Aadhaar Number Validator"
      description="Validate Indian Aadhaar unique identification numbers. Check Aadhaar format, Luhn algorithm, and number validity."
      icon={<User className="h-8 w-8 text-white" />}
      resultType="validation"
      settings={[
        {
          key: "aadhaarNumber",
          label: "Aadhaar Number",
          type: "text",
          placeholder: "1234 5678 9012",
          required: true,
          description: "Enter 12-digit Aadhaar number to validate"
        },
        {
          key: "validationType",
          label: "Validation Type",
          type: "select",
          options: ["Format Check", "Luhn Algorithm", "Complete Validation"],
          defaultValue: "Complete Validation",
          description: "Level of validation to perform"
        },
        {
          key: "allowSpaces",
          label: "Allow Spaces",
          type: "switch",
          defaultValue: true,
          description: "Accept Aadhaar with spaces or hyphens"
        },
        {
          key: "showAlgorithm",
          label: "Show Algorithm Details",
          type: "switch",
          defaultValue: false,
          description: "Display Luhn algorithm validation steps"
        },
        {
          key: "maskNumber",
          label: "Mask Number in Results",
          type: "switch",
          defaultValue: true,
          description: "Hide middle digits for privacy (XXXX XXXX 9012)"
        }
      ]}
      endpoint="/api/tools/aadhaar-validator"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
    />
  );
}